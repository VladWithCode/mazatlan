import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/layout/header";
import { Footer } from "./_components/layout/footer";
import { Toaster } from "sonner";

const montserrat = Montserrat({
    variable: "--font-main",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: "Sibra",
    description: "Aprovecha esta oportunidad para el desarrollo de viviendo en una zona con crecimiento urbano de Mazatlán, Sinaloa.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es_MX">
            <body
                className={`${montserrat.variable} antialiased`}
            >
                <Header />
                {children}
                <Footer />
                <Toaster />
            </body>
        </html>
    );
}
