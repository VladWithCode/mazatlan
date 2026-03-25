"use client";

import Image from "next/image";
import { features } from "./contents";
import { LocationMap } from "./_components/maps/location_map";
import { ChevronDown, Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";
import { DottedSquare } from "./_components/layout/dottedSquare";

import truckImg from "@/app/_assets/truck.webp";
import engineerImg from "@/app/_assets/engineer.webp";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import gsap from "gsap";
import { animations } from "./animations";
import { Button } from "./_components/ui/button";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);

    const { contextSafe } = useGSAP({ scope: containerRef });
    const animateIn = contextSafe((elt: Element) => {
        const animationType = (elt as HTMLElement).dataset.animate;
        if (!animationType) {
            return;
        }
        const animation = animations[animationType];
        if (!animation) {
            return;
        }
        gsap.to(elt, {
            duration: 0.8,
            ease: "power2.in",
            delay: 0.1,
            ...animation,
        });
    })

    useEffect(() => {
        const observer = new IntersectionObserver((ents) => {
            for (const ent of ents) {
                if (ent.isIntersecting) {
                    animateIn(ent.target);
                    observer.unobserve(ent.target);
                }
            }
        }, { threshold: 0.35 });

        const elts = containerRef.current?.querySelectorAll("[data-animate]");
        if (elts) {
            for (const elt of elts) {
                observer.observe(elt);
            }
        }

        return () => {
            observer.disconnect();
        }
    }, [])

    return (
        <main className="bg-sky-900 text-background" id="inicio" ref={containerRef}>
            <section className="relative z-0 max-h-screen overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image className="object-center object-cover xl:w-full" src="/img5.webp" alt="alt" height={1600} width={1200} />
                </div>
                <div
                    className="absolute inset-0 z-10 h-full w-full bg-linear-to-r from-sky-500 from-25% via-sky-500/60 via-80% to-sky-500/0 to-100% animate-fadein"
                    data-animate="fadein"
                >
                </div>
                <div className="relative z-20 aspect-3/4 max-w-7xl xl:aspect-auto px-6 py-24 space-y-8 -rotate-2 mx-auto xs:px-12 xs:space-y-8 sm:px-16 sm:py-32 md:py-40 md:space-y-12 lg:px-24 lg:pt-72 lg:pb-120 lg:aspect-auto">
                    <h1 className="flex flex-col gap-2 text-background text-5xl xs:text-6xl uppercase font-bold lg:max-w-[75%] animate-slide" data-animate="slideY">
                        <span>Construye tu proximo desarrollo</span>
                        <span className="text-xl font-bold uppercase bg-blue-950 mx-auto px-2 py-px xs:text-2xl">en este terreno</span>
                    </h1>
                    <p className="max-w-[85%] text-current/95 text-sm text-justify font-extrabold xs:text-base md:text-lg lg:max-w-[75%] animate-slide" data-animate="slideY">
                        Aprovecha esta única oportunidad estratégica para el
                        desarrollo de vivienda en una zona en crecimiento urbana
                        de Mazatlán, Sinaloa.
                    </p>
                </div>
                <div className="absolute inset-x-0 bottom-2 z-20 flex items-center justify-center">
                    <Button
                        onClick={() => window.scrollBy({ top: window.innerHeight })}
                        variant="ghost">
                        <ChevronDown className="size-6 sm:size-10 scroll-indicator" />
                    </Button>
                </div>
            </section>
            <section className="bg-linear-to-b from-slate-950/0 to-slate-950 overflow-hidden">
                <div className="relative z-0">
                    <div className="relative">
                        <Image
                            className="xl:w-full animate-fadein"
                            src="/img6.webp"
                            alt="alt"
                            width={1600} height={900}
                            data-animate="fadein"
                        />
                        <div className="absolute inset-x-0 -bottom-10 z-10 max-w-7xl mx-auto px-6 xs:-bottom-12 sm:-bottom-14 md:-bottom-16 lg:-bottom-18 lg:px-12">
                            <h2 className="flex flex-col text-3xl font-black uppercase text-border leading-tight xs:text-4xl sm:text-5xl lg:text-6xl">
                                <span className="text-green-500 animate-slide" data-animate="slideY">Información</span>
                                <span className="text-neutral-50 animate-slide" data-animate="slideY">general</span>
                            </h2>
                        </div>
                    </div>
                    <div className="relative z-0 max-w-7xl mx-auto px-6 py-12 space-y-4 sm:py-16 sm:space-y-8 md:py-18 lg:py-24 lg:px-12">
                        <p className="text-current/60 font-medium lg:text-lg max-w-prose animate-slide" data-animate="slideY">
                            Ideal para desarrolladores que buscan construir vivienda
                            en una zona con expansión natural de la ciudad.
                        </p>
                        <ul className="max-w-2/3 list-disc list-inside sm:text-lg lg:text-xl">
                            <li className="animate-slide" data-animate="slideY">88,283 m<sup>2</sup></li>
                            <li className="animate-slide" data-animate="slideY">Ubicación estratégica</li>
                            <li className="animate-slide" data-animate="slideY">Uso de suelo habitacional</li>
                            <li className="animate-slide" data-animate="slideY">Agua, drenaje y electricidad a pie del predio</li>
                            <li className="animate-slide" data-animate="slideY">Autorizado para desarrollo de vivienda</li>
                        </ul>
                        <p className="absolute left-8 -bottom-4 z-10 bg-neutral-950 border-3 border-green-500 rounded-lg font-bold uppercase px-6 py-1 sm:-bottom-6 sm:text-lg lg:text-xl lg:px-6 lg:py-2.5 animate-slide-right" data-animate="slideX">
                            Sobre el predio
                        </p>
                        <div className="absolute z-10 -bottom-5 -right-1/4 xs:-right-1/8 sm:-right-4 lg:right-0 lg:-bottom-10">
                            <Image className="w-auto h-72 lg:h-120 animate-slide-left" src={truckImg} alt="alt" width={1024} height={1024} data-animate="slideX" />
                        </div>
                    </div>
                    <hr className="border-t-6" />
                </div>
                <div className="bg-sky-900 py-4"></div>
            </section>
            <section className="relative max-w-7xl mx-auto px-2 lg:px-4">
                <Image className="absolute inset-y-0 -left-2 z-0 w-auto h-full animate-fadein" src={engineerImg} alt="alt" width={720} height={1292} data-animate="fadein" />
                <div className="relative z-0 w-2/3 font-black space-y-1.5 ml-auto sm:space-y-4 lg:pt-12 lg:pb-4">
                    <div className="space-y-1.5 animate-slide" data-animate="slideY">
                        <h2 className="text-2xl text-center -ml-2 2xs:text-nowrap sm:text-3xl lg:text-4xl">Contactanos y Aprovecha</h2>
                        <p className="text-6xl text-center uppercase sm:text-7xl lg:text-9xl">Precio</p>
                    </div>
                    <div className="flex justify-between gap-3 bg-green-500 px-0 py-1.5 sm:py-2 lg:py-4 lg:pr-4 animate-slide" data-animate="slideY">
                        <div className="basis-1/5 bg-sky-900 lg:basis-1/3">&nbsp;</div>
                        <p className="text-2xl text-end px-4 xs:text-3xl sm:text-4xl lg:text-5xl">$500.00 MXN/M<sup>2</sup></p>
                    </div>
                    <div className="relative z-0 py-1 sm:py-2 animate-slide" data-animate="slideY">
                        <div className="absolute z-0 inset-y-0 left-0 min-w-1/3 bg-background">
                            &nbsp;
                        </div>
                        <Image className="relative z-10" width={1600} height={900} src="/img1.webp" alt="alt" />
                    </div>
                </div>
            </section>
            <section className="relative bg-neutral-100">
                <div className="relative z-10 max-w-7xl flex items-center justify-between mx-auto">
                    <p className="relative text-foreground uppercase px-6 py-2 leading-tight xs:pr-8 sm:text-lg sm:py-4 lg:text-xl lg:px-12 animate-slide-right" data-animate="slideX">Oportunidad para desarrollo habitacional en Mazatlán</p>
                    <div className="relative bg-green-500 px-6 py-2 sm:py-4 animate-slide-left" data-animate="slideX">
                        <div className="absolute z-0 -left-2.5 inset-y-0 w-10 bg-green-500 skew-x-12">&nbsp;</div>
                        <p className="flex flex-col relative z-10 text-center xl:text-left text-lg font-black uppercase leading-tight sm:text-xl md:text-2xl">
                            <span>Detalles</span>
                            <span className="text-base tracking-tighter md:text-lg">adicionales</span>
                        </p>
                    </div>
                </div>
                <div className="absolute inset-y-0 right-0 w-1/6 bg-green-500">
                </div>
            </section>
            <section>
                <Image className="xl:w-full animate-fadein" src="/img2.webp" alt="alt" width={1600} height={900} data-animate="fadein" />
                <Image className="xl:w-full animate-fadein" src="/img3.webp" alt="alt" width={1600} height={900} data-animate="fadein" />
            </section>
            <section className="relative z-0">
                <div className="absolute z-0 inset-0">
                    <Image className="absolute z-0 h-full min-w-full object-cover" src="/img7.webp" alt="alt" width={1600} height={848} />
                    <div className="absolute inset-0 z-10 w-1/2 bg-sky-950 border-r-16 border-green-500">
                    </div>
                </div>
                <div className="relative z-10 pt-24 pb-6 space-y-24 lg:pt-32 lg:pb-16 lg:space-y-32 xl:pt-52 xl:pb-24 xl:space-y-64">
                    <div className="w-4/5 bg-green-500/90 font-black py-8 px-6 rounded-e-lg sm:px-8 sm:py-12 lg:text-3xl lg:px-12 xl:pl-40 xl:w-3/5">
                        <h3>Zona con crecimiento urbano.</h3>
                        <p>Cercanía con escuelas, transporte público y áreas comerciales.</p>
                    </div>
                    <div className="max-w-7xl px-6 mx-auto sm:px-2 lg:px-12">
                        <ul className="grid grid-cols-2 grid-rows-2 items-center gap-4 bg-background rounded-lg text-foreground p-6 mx-auto sm:grid-cols-4 sm:grid-rows-1 sm:rounded-full lg:px-12">
                            {
                                features.map(ft => (
                                    <li className="flex flex-col gap-3 items-center animate-scale" key={ft.title} data-animate="scale">
                                        <Image className="size-16" src={ft.icon} alt="alt" width={900} height={900} />
                                        <p className="text-center font-black uppercase">{ft.title}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </section>
            <section className="relative z-0">
                <div className="absolute inset-0 z-0">
                    <Image className="brightness-60 object-cover h-full w-auto md:max-h-full md:w-full" src="/img4.webp" alt="alt" width={1600} height={900} />
                </div>
                <div className="relative z-10 max-w-7xl py-12 px-6 mx-auto space-y-2 pb-20 xs:space-y-4 lg:px-12 md:pb-60 xl:pb-120">
                    <div className="w-fit bg-green-600 text-background rounded lg:px-2 lg:py-1">
                        <p className="font-bold px-2 py-0.5 sm:text-lg lg:text-xl">Facilidad para gestión de proyectos.</p>
                    </div>
                    <h2 className="text-2xl font-bold w-3/5 sm:w-4/5 sm:text-3xl lg:text-4xl" style={{ textShadow: "2px 2px 6px rgb(0,0,0)" }}>
                        Zona en expansión con demanda de vivienda en Mazatlán.
                    </h2>
                    <div className="absolute -bottom-16 right-2 z-10 sm:-bottom-40">
                        <div className="size-48 rounded-full overflow-hidden outline-10 outline-sky-800 md:size-60 lg:size-96 animate-scale" data-animate="scale">
                            <Image src="/img5.webp" alt="alt" width={1200} height={1600} />
                        </div>
                        <div className="absolute z-10 -bottom-1/4 left-1/2 -translate-x-1/2 rotate-3 lg:left-2/5 animate-scale" data-animate="scale">
                            <div className="size-26 rounded-full bg-green-600 md:size-30 lg:size-auto lg:aspect-square lg:p-10">
                                <p className="w-full h-full flex flex-col items-center justify-center md:text-lg lg:text-4xl">
                                    <span>A sólo</span>
                                    <span>$500</span>
                                    <span>/Metro<sup>2</sup></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-background pt-24 xl:p-0" id="ubicacion">
                <LocationMap
                    className="w-full h-[50dvh] lg:h-auto lg:aspect-square xl:aspect-auto xl:h-dvh"
                />
            </section>
            <section className="relative z-0 bg-background py-18 px-6 overflow-hidden md:px-12 md:py-24" id="contacto">
                <div className="absolute inset-0 z-0 bg-sky-950 w-1/3">
                    <div className="absolute bottom-8 -left-1 aspect-square animate-scale" data-animate="scale">
                        <DottedSquare
                            dotHeight={12}
                            dotWidth={4}
                            dotClassName="bg-background"
                        />
                    </div>
                </div>
                <div className="absolute z-10 top-4 right-4 animate-scale" data-animate="scale">
                    <DottedSquare size={6} />
                </div>
                <div className="relative z-10 bg-foreground rounded-lg p-6 m-auto space-y-3 xs:py-8 sm:py-12 sm:space-y-6 lg:w-2xl lg:space-y-12">
                    <h2 className="text-3xl uppercase sm:text-4xl sm:px-4 md:px-8 animate-slide" data-animate="slideY">Contacto</h2>
                    <ul className="*:not-first:py-3 *:first:pb-3 xs:*:px-2 sm:text-lg sm:*:not-first:py-4 sm:*:first:pb-4 sm:*:px-4 sm:*:px-8">
                        <li className="flex items-center gap-4 border-b-2 border-dashed border-background animate-slide" data-animate="slideY">
                            <div className="grow-0 shrink-0 text-green-500">
                                <MapPin className="size-8" />
                            </div>
                            <p className="text-background/80">C. Cancer #132. Fracc. Sahop, 34190 Durango, Dgo.</p>
                        </li>
                        <li className="flex items-center gap-4 border-b-2 border-dashed border-background animate-slide" data-animate="slideY">
                            <div className="grow-0 shrink-0 text-green-500">
                                <Phone className="size-8" />
                            </div>
                            <p className="flex flex-col text-background/80">
                                <span>C. Claudia Bertha P. González</span>
                                <span>+52 669 224 4798</span>
                            </p>
                        </li>
                        <li className="flex items-center gap-4 border-b-2 border-dashed border-background animate-slide" data-animate="slideY">
                            <div className="grow-0 shrink-0 text-green-500">
                                <Phone className="size-8" />
                            </div>
                            <p className="flex flex-col text-background/80">
                                <span>Ing. José Flores Hernández</span>
                                <span>+52 618 838 1744</span>
                            </p>
                        </li>
                        <li className="flex items-center gap-4 border-b-2 border-dashed border-background animate-slide" data-animate="slideY">
                            <div className="grow-0 shrink-0 text-green-500">
                                <Mail className="size-8" />
                            </div>
                            <p className="text-background/80">sibramx.business@gmail.com</p>
                        </li>
                    </ul>
                    <div className="absolute bottom-0 right-0 z-10 grid grid-cols-1 grid-rows-1 translate-1/2 animate-scale" data-animate="scale">
                        <MessageCircleMore className="relative -left-7 -top-7 z-0 col-start-1 row-start-1 size-16 fill-emerald-800 scale-x-[-1] sm:size-24" />
                        <MessageCircleMore className="relative z-10 col-start-1 row-start-1 size-16 fill-green-500 sm:size-24" />
                    </div>
                </div>
            </section>
        </main>
    );
}
