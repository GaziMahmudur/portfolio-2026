'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

export function ThemeToggle({ className, noBackground }: { className?: string; noBackground?: boolean }) {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // useEffect only runs on the client, so now we can safely show the UI
    React.useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = (event: React.MouseEvent) => {
        if (!document.startViewTransition) {
            setTheme(theme === 'dark' ? 'light' : 'dark');
            return;
        }

        // Get the click position, or use top right if triggered differently
        const x = event.clientX;
        const y = event.clientY;

        const transition = (document as any).startViewTransition(() => {
            setTheme(theme === 'dark' ? 'light' : 'dark');
        });

        transition.ready.then(() => {
            const endRadius = Math.hypot(
                Math.max(x, window.innerWidth - x),
                Math.max(y, window.innerHeight - y)
            );

            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`,
                    ],
                },
                {
                    duration: 500,
                    easing: 'ease-in-out',
                    pseudoElement: '::view-transition-new(root)',
                }
            );
        });
    };

    if (!mounted) {
        return <div className={cn("size-12 p-2", className)} />;
    }

    return (
        <button
            onClick={toggleTheme}
            className={cn(
                "group size-12 flex items-center justify-center rounded-full transition-all duration-300",
                !noBackground && "bg-background-light border border-border hover:border-primary",
                className
            )}
            aria-label="Toggle theme"
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </button>
    );
}
