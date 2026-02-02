import { memo } from 'react';


export const Hero = memo(() => (
    <section className="bg-white py-16 text-center md:py-24 border-b border-gray-50">
        <div className="mx-auto max-w-4xl px-4">
            <h1 className="text-4xl font-black uppercase tracking-[-0.05em] italic md:text-7xl leading-none text-black">
                NEW ARRIVALS
            </h1>

            <p className="mt-6 text-[10px] text-gray-800 uppercase tracking-[0.4em] font-bold">
                Explora as últimas tendências da estação / SS24
            </p>
        </div>
    </section>
))
