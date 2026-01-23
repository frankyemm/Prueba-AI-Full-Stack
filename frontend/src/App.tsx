import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import type { Ticket } from './types';
import Header from './components/Header';
import TicketList from './components/TicketList';

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTickets();

    // 2. Suscripción Realtime
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // Listen to INSERT and UPDATE
          schema: 'public',
          table: 'tickets',
        },
        (payload) => {
          console.log('Change received!', payload);
          if (payload.eventType === 'INSERT') {
            const newTicket = payload.new as Ticket;
            setTickets((prev) => [newTicket, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            const updatedTicket = payload.new as Ticket;
            setTickets((prev) =>
              prev.map((t) => (t.id === updatedTicket.id ? updatedTicket : t))
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (err: any) {
      setError(err.message || 'Error al cargar los tickets');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center">
            <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-500 font-medium">Cargando tickets en tiempo real...</p>
          </div>
        ) : (
          <TicketList tickets={tickets} />
        )}
      </main>

      <footer className="py-8 text-center border-t border-gray-100 mt-auto">
        <p className="text-xs text-gray-400">
          Vivetori - AI-Powered Support Co-Pilot &copy; {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;
