'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline();

            tl.to('.name-text span', {
                y: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 1.5,
                ease: 'power4.out',
                force3D: true,
            });

            tl.to('.preloader-item', {
                delay: 0.2,
                y: '100%',
                duration: 1,
                stagger: 0.05,
                ease: 'power4.inOut',
            })
                .to('.name-text span', { autoAlpha: 0, duration: 0.5 }, '<0.2')
                .to(
                    preloaderRef.current,
                    {
                        autoAlpha: 0,
                        duration: 0.8,
                    },
                    '<0.5',
                );
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[999] flex overflow-hidden" ref={preloaderRef}>
            {[...Array(10)].map((_, i) => (
                <div key={i} className="preloader-item h-full w-[10%] bg-black"></div>
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-fit">
                <p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center leading-none">
                    <span className="inline-block translate-y-[100vh] uppercase will-change-transform px-1">A</span>
                    <span className="inline-block translate-y-[100vh] uppercase will-change-transform px-1">S</span>
                    <span className="inline-block translate-y-[100vh] uppercase will-change-transform px-1">H</span>
                    <span className="inline-block translate-y-[100vh] uppercase will-change-transform px-1">I</span>
                    <span className="inline-block translate-y-[100vh] uppercase will-change-transform px-1">K</span>
                </p>
            </div>
        </div>
    );
};

export default Preloader;
