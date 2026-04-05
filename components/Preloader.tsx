'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

gsap.registerPlugin(useGSAP);

const Preloader = () => {
    const preloaderRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                defaults: {
                    ease: 'expo.out',
                },
            });

            tl.to('.name-text span', {
                y: 0,
                stagger: 0.05,
                duration: 1.2,
                force3D: true,
            });

            tl.to('.preloader-item', {
                delay: 0.5,
                y: '100%',
                duration: 0.8,
                stagger: 0.05,
                ease: 'power4.inOut',
            })
                .to('.name-text span', { autoAlpha: 0, duration: 0.4 }, '<0.2')
                .to(
                    preloaderRef.current,
                    {
                        autoAlpha: 0,
                        duration: 0.5,
                    },
                    '<0.4',
                );
        },
        { scope: preloaderRef },
    );

    return (
        <div className="fixed inset-0 z-[6] flex" ref={preloaderRef}>
            {[...Array(10)].map((_, i) => (
                <div key={i} className="preloader-item h-full w-[10%] bg-black"></div>
            ))}

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                <p className="name-text flex text-[20vw] lg:text-[200px] font-anton text-center leading-none">
                    <span className="inline-block translate-y-full uppercase px-1 will-change-transform">A</span>
                    <span className="inline-block translate-y-full uppercase px-1 will-change-transform">S</span>
                    <span className="inline-block translate-y-full uppercase px-1 will-change-transform">H</span>
                    <span className="inline-block translate-y-full uppercase px-1 will-change-transform">I</span>
                    <span className="inline-block translate-y-full uppercase px-1 will-change-transform">K</span>
                </p>
            </div>
        </div>
    );
};

export default Preloader;
