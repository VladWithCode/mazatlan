import Link from "next/link";

export function Footer() {
    return (
        <footer className="relative z-0 bg-sky-900 text-background pt-12 pb-3">
            <nav className="w-9/10 px-6 mx-auto">
                <ul className="flex justify-center items-center gap-12">
                    <li>
                        <Link href="#inicio">Inicio</Link>
                    </li>
                    <li>
                        <Link href="#ubicacion">Ubicación</Link>
                    </li>
                    <li>
                        <Link href="#contacto">Contacto</Link>
                    </li>
                </ul>
            </nav>
            <hr className="border-t-2 border-current/30 my-6" />
            <p className="text-sm text-center text-current/60">Visita <a className="text-sky-100/40" href="https://sibra.mx">sibra.mx</a>.</p>
            <div className="mt-12 px-6">
                <p className="text-xs text-center text-current/30">&copy; 2026 Sibra. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
}
