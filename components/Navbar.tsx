'use client';
import { cn } from '@/lib/utils';
import { MoveUpRight } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { GENERAL_INFO } from '@/lib/data';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';
import Image from 'next/image';

const COLORS = [
    'bg-yellow-500 text-black',
    'bg-blue-500 text-white',
    'bg-teal-500 text-black',
    'bg-indigo-500 text-white',
];

const MENU_LINKS = [
    {
        name: 'Home',
        url: '/',
        id: 'banner',
    },
    {
        name: 'Portfolio',
        url: '/#selected-projects',
        id: 'selected-projects',
    },
    {
        name: 'Resume',
        url: '/assets/Resume.pdf',
    },
    {
        name: 'Testimonials',
        url: '/#testimonials',
        id: 'testimonials',
    },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Home');
    const router = useRouter();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-40% 0px -40% 0px',
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const link = MENU_LINKS.find((l) => l.id === entry.target.id);
                    if (link) setActiveSection(link.name);
                }
            });
        }, observerOptions);

        MENU_LINKS.forEach((link) => {
            if (link.id) {
                const el = document.getElementById(link.id);
                if (el) observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    const [isNotchHidden, setIsNotchHidden] = useState(false);

    useLenis(({ scroll, direction }) => {
        // direction: 1 for down, -1 for up
        const threshold = 150;
        
        if (scroll > threshold && direction === 1 && !isNotchHidden) {
            setIsNotchHidden(true);
            gsap.to('.desktop-notch', { 
                y: -150, 
                autoAlpha: 0, 
                duration: 0.5, 
                ease: 'power3.inOut',
                overwrite: true 
            });
        } else if ((direction === -1 || scroll <= threshold) && isNotchHidden) {
            setIsNotchHidden(false);
            gsap.to('.desktop-notch', { 
                y: 0, 
                autoAlpha: 1, 
                duration: 0.5, 
                ease: 'power3.out',
                overwrite: true 
            });
        }
    });

    useGSAP(() => {
        gsap.fromTo(
            '.desktop-notch',
            { y: -100, autoAlpha: 0 },
            { y: 0, autoAlpha: 1, duration: 1, delay: 3, ease: 'power4.out' }
        );
    });

    return (
        <>
            {/* Desktop Notch Navigation */}
            <nav className="desktop-notch fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden min-[600px]:flex items-center gap-2 px-4 py-2 bg-foreground rounded-full shadow-2xl border border-white/10 invisible">
                {/* Logo Space */}
                <div className="w-10 h-10 mr-4 flex items-center justify-center translate-y-[-1px]" id="logo-placeholder">
                    {/* Dark Mode Notch Logo (Black) */}
                    <Image 
                        src="/logo/logo-black.png" 
                        alt="Logo" 
                        width={40} 
                        height={40} 
                        className="object-contain hidden dark:block"
                    />
                    {/* Light Mode Notch Logo (White) */}
                    <Image 
                        src="/logo/logo-white.png" 
                        alt="Logo" 
                        width={40} 
                        height={40} 
                        className="object-contain block dark:hidden"
                    />
                </div>

                <div className="flex items-center gap-8 px-4">
                    {MENU_LINKS.map((link) => {
                        const isActive = activeSection === link.name;
                        return (
                            <a
                                key={link.name}
                                href={link.url}
                                className={cn(
                                    "text-sm font-bold transition-all relative py-1",
                                    isActive ? "text-background" : "text-background/60 hover:text-background"
                                )}
                            >
                                {link.name}
                                {isActive && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-background rounded-full transition-all"></span>
                                )}
                            </a>
                        );
                    })}
                </div>

                <ThemeToggle noBackground className="size-8 text-background hover:text-background/70" />
            </nav>

            {/* Mobile Navigation (Hamburger) */}
            <div className="fixed top-0 right-0 z-50 min-[600px]:hidden">
                <ThemeToggle className="absolute top-5 right-20 z-[2]" />
                <button
                    className={cn(
                        'group size-12 absolute top-5 right-5 z-[2]',
                    )}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 -translate-y-[5px] ',
                            {
                                'rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                    <span
                        className={cn(
                            'inline-block w-3/5 h-0.5 bg-foreground rounded-full absolute left-1/2 -translate-x-1/2 top-1/2 duration-300 translate-y-[5px] ',
                            {
                                '-rotate-45 -translate-y-1/2': isMenuOpen,
                                'md:group-hover:-rotate-12': !isMenuOpen,
                            },
                        )}
                    ></span>
                </button>
            </div>

            <div
                className={cn(
                    'overlay fixed inset-0 z-[2] bg-black/70 transition-all duration-150',
                    {
                        'opacity-0 invisible pointer-events-none': !isMenuOpen,
                    },
                )}
                onClick={() => setIsMenuOpen(false)}
            ></div>

            <div
                className={cn(
                    'fixed top-0 right-0 h-[100dvh] w-[500px] max-w-[calc(100vw-3rem)] transform translate-x-full transition-transform duration-700 z-[3] overflow-hidden gap-y-14',
                    'flex flex-col lg:justify-center py-10',
                    { 'translate-x-0': isMenuOpen },
                )}
            >
                <div
                    className={cn(
                        'fixed inset-0 scale-150 translate-x-1/2 rounded-[50%] bg-background-light duration-700 delay-150 z-[-1]',
                        {
                            'translate-x-0': isMenuOpen,
                        },
                    )}
                ></div>

                <div className="grow flex md:items-center w-full max-w-[300px] mx-8 sm:mx-auto">
                    <div className="flex gap-10 lg:justify-between max-lg:flex-col w-full">
                        <div className="">
                            <p className="text-muted-foreground mb-5 md:mb-8">
                                MENU
                            </p>
                            <ul className="space-y-3">
                                {MENU_LINKS.map((link, idx) => (
                                    <li key={link.name}>
                                        <button
                                            onClick={() => {
                                                router.push(link.url);
                                                setIsMenuOpen(false);
                                            }}
                                            className="group text-xl flex items-center gap-3"
                                        >
                                            <span
                                                className={cn(
                                                    'size-3.5 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-[200%] transition-all',
                                                    COLORS[idx % COLORS.length],
                                                )}
                                            >
                                                <MoveUpRight
                                                    size={8}
                                                    className="scale-0 group-hover:scale-100 transition-all"
                                                />
                                            </span>
                                            {link.name}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-[300px] mx-8 sm:mx-auto">
                    <p className="text-muted-foreground mb-4">GET IN TOUCH</p>
                    <a href={`mailto:${GENERAL_INFO.email}`}>
                        {GENERAL_INFO.email}
                    </a>
                </div>
            </div>
        </>
    );
};

export default Navbar;
