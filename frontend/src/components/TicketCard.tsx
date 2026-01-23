import React from 'react';
import type { Ticket } from '../types';

interface TicketCardProps {
    ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
    const getCategoryColor = (category: string | null) => {
        switch (category) {
            case 'Técnico': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Facturación': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Comercial': return 'bg-green-100 text-green-800 border-green-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getSentimentColor = (sentiment: string | null) => {
        switch (sentiment) {
            case 'Positivo': return 'bg-emerald-100 text-emerald-800';
            case 'Neutral': return 'bg-amber-100 text-amber-800';
            case 'Negativo': return 'bg-rose-100 text-rose-800';
            default: return 'bg-gray-100 text-gray-500';
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col h-full uppercase">
            <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getCategoryColor(ticket.category)}`}>
                    {ticket.category || 'Pendiente IA'}
                </span>
                {ticket.processed && (
                    <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                        PROCESADO
                    </div>
                )}
            </div>

            <p className="text-gray-800 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed normal-case">
                {ticket.description}
            </p>

            <div className="pt-4 border-t border-gray-50 mt-auto">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] text-gray-400 font-mono tracking-tighter">
                        ID: {ticket.id.slice(0, 8)}...
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${getSentimentColor(ticket.sentiment)}`}>
                        {ticket.sentiment || 'ANALIZANDO...'}
                    </span>
                </div>
                <span className="text-[10px] text-gray-400">
                    {new Date(ticket.created_at).toLocaleString()}
                </span>
            </div>
        </div>
    );
};

export default TicketCard;
