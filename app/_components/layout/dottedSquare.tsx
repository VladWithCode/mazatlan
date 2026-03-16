import { cn } from "@/app/_lib/utils";

export function DottedSquare({ size, dotClassName, dotHeight, dotWidth, ...props }: {
    size?: number
    dotHeight?: number
    dotWidth?: number
    dotClassName?: string
} & React.HTMLAttributes<HTMLDivElement>) {
    const height = dotHeight ?? size;
    const width = dotWidth ?? size;
    const area = (Number(height) * Number(width)) || 0;

    return (
        <div
            className={cn(
                "grid gap-2",
                `grid-cols-(--cols) grid-rows-(--rows)`,
            )}
            style={{
                ...props.style,
                "--cols": `repeat(${width}, 1fr)`,
                "--rows": `repeat(${height}, 1fr)`,
            } as React.CSSProperties}
            {...props}
        >
            {Array.from({ length: area }).map((_, i) => (
                <div key={i} className={cn("size-1.5 bg-green-500 rounded-full", dotClassName)} />
            ))}
        </div>
    )
}
