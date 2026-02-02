export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-gray-100 bg-white py-12">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex flex-col items-center justify-between space-y-8 md:flex-row md:space-y-0">

                    <div className="text-center md:text-left">
                        <h2 className="text-lg font-black tracking-tighter text-black">LA MODA</h2>
                        <p className="mt-2 text-[10px] uppercase tracking-widest text-lamoda-gray">
                            Digital Fashion Studio
                        </p>
                    </div>

                    <nav className="flex space-x-6 text-[10px] font-bold uppercase tracking-widest text-black">
                        <a href="#" className="hover:text-lamoda-gray transition-colors">Apoio ao Cliente</a>
                        <a href="#" className="hover:text-lamoda-gray transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-lamoda-gray transition-colors">Termos</a>
                    </nav>

                    <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-lamoda-gray">
                        © {currentYear} TODOS OS DIREITOS RESERVADOS.
                    </div>
                </div>
            </div>
        </footer>
    );
};