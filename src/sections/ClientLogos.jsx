import React from 'react';
import { clientLogos } from '../data/clientLogos';

const ClientLogos = () => {
  return (
    <section className="py-20 border-y border-luxury-black/5 overflow-hidden bg-luxury-white">
      <div className="flex items-center space-x-24 animate-slow-pan whitespace-nowrap px-12">
        {[...clientLogos, ...clientLogos].map((client, index) => (
          <div key={`${client.id}-${index}`} className="flex items-center justify-center grayscale opacity-30 hover:opacity-100 hover:grayscale-0 transition-all duration-500">
             <span className="text-2xl font-display font-bold tracking-widest">{client.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientLogos;
