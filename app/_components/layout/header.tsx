import Image from "next/image";

import logo_wt from "@/app/_assets/logo_wt.webp";

export function Header() {
    return (
        <header className="absolute inset-x-0 top-0 z-50 flex items-center justify-between h-16 pointer-events-none p-2">
            <div className="flex-1"></div>
            <div className="grow-0 h-full">
                <Image className="h-full w-auto aspect-square" src={logo_wt} alt="logo" width={1024} height={1024} />
            </div>
        </header>
    );
}
