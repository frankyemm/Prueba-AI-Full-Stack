import React from 'react';
import type { Ticket } from '../types';
import TicketCard from './TicketCard';

interface TicketListProps {
    tickets: Ticket[];
}

const TicketList: React.FC<TicketListProps> = ({ tickets }) => {
    if (tickets.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400 text-lg">No hay tickets registrados aún.</p>
                <p className="text-gray-300 text-sm mt-2">Los nuevos tickets aparecerán aquí en tiempo real.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
};

export default TicketList;
