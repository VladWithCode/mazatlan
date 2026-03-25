"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import logo_wt from "@/app/_assets/logo_wt.webp";
import gsap from "gsap";

export function Navigation() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navAnimRef = useRef<gsap.core.Timeline>(null);
    useGSAP(() => {
        navAnimRef.current = gsap.timeline();
        navAnimRef.current.pause();

        navAnimRef.current
            .addLabel("start", 0)
            .fromTo(
                "[data-mobile-nav-wrapper]",
                { autoAlpha: 0 },
                { autoAlpha: 1, duration: 0.3 },
            )
            .fromTo(
                "[data-mobile-nav-close]",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5 },
            )
            .fromTo(
                "[data-mobile-nav-logo]",
                { scale: 0, opacity: 0 },
                { scale: 1, opacity: 1, duration: 0.5 },
                "<",
            )
            .fromTo(
                "[data-mobile-nav-visit]",
                { opacity: 0, y: "0.5rem" },
                { opacity: 1, y: "0rem", duration: 0.8 },
                "<",
            )
            .fromTo(
                "[data-mobile-nav] li",
                { opacity: 0, y: "0.5rem" },
                { opacity: 1, y: "0rem", stagger: 0.05, duration: 0.5 },
                "start+=0.5",
            )
    });
    const toggleMenu = useCallback(() => {
        if (navAnimRef.current?.reversed() ?? true) {
            navAnimRef.current?.play();
            setIsMenuOpen(true);
        } else {
            navAnimRef.current?.reverse();
            setIsMenuOpen(false);
        }
    }, []);

    return (
        <>
            <Button
                variant="ghost"
                className="block xl:hidden text-background pointer-events-auto"
                aria-label="Alternar menú"
                onClick={() => toggleMenu()}
                data-mobile-nav-toggle
            >
                <MenuIcon className="size-5 sm:size-10" />
            </Button>
            <div className="fixed inset-0 z-50 h-dvh w-screen opacity-0 invisible pointer-events-auto overflow-hidden text-background" data-mobile-nav-wrapper>
                <div className="absolute top-2 inset-x-0 h-24 grid grid-cols-3">
                    <div className="p-2">
                        <Button variant="ghost" size="icon-lg" onClick={() => toggleMenu()} data-mobile-nav-close>
                            <XIcon className="size-6 stroke-3" />
                        </Button>
                    </div>
                    <Image className="h-full w-auto aspect-square col-start-2" src={logo_wt} alt="logo" width={1024} height={1024} data-mobile-nav-logo />
                </div>
                <nav id="mobile-nav" className="h-full flex flex-col bg-sky-500" data-mobile-nav>
                    <ul className="flex flex-col items-center gap-8 text-3xl tracking-wide uppercase underline underline-offset-2 my-auto">
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
                <div className="absolute bottom-2 inset-x-0">
                    <p className="text-current/80 text-sm text-center font-medium" data-mobile-nav-visit>Visitanos en <a href="https://sibra.mx">sibra.mx</a></p>
                </div>
            </div>
            <nav id="desktop-nav" className="hidden xl:block max-w-7xl text-background px-6 mx-auto pointer-events-auto">
                <ul className="flex items-center gap-12 font-bold uppercase underline underline-offset-2">
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
        </>
    );
}
