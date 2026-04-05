'use client';
import ArrowAnimation from '@/components/ArrowAnimation';
import Button from '@/components/Button';
import { GENERAL_INFO } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import React from 'react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Banner = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);

    // move the content a little up on scroll
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 70%',
                    end: 'bottom 10%',
                    scrub: 1,
                },
            });

            tl.fromTo(
                '.slide-up-and-fade',
                { y: 0 },
                { y: -150, opacity: 0, stagger: 0.02 },
            );
        },
        { scope: containerRef },
    );

    return (
        <section className="relative overflow-hidden" id="banner">
            <ArrowAnimation />
            <div
                className="container h-[100svh] min-h-[530px] max-md:pb-10 flex justify-between items-center max-md:flex-col"
                ref={containerRef}
            >
                <div className="max-md:grow max-md:flex flex-col justify-center items-start max-w-[544px]">
                    <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 slide-up-and-fade">
                        <div className="size-32 sm:size-40 rounded-3xl bg-background-light border-2 border-primary/20 overflow-hidden relative group shrink-0 shadow-2xl shadow-primary/10">
                            {/* Placeholder for Profile Picture */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                                <span className="text-4xl text-primary/30 font-anton">ASHIK</span>
                            </div>
                        </div>
                        <h1 className="banner-title leading-[1] text-6xl sm:text-[82px] font-anton flex flex-col items-start">
                            <span className="text-primary">SOFTWARE</span>
                            <span>ENGINEER</span>
                        </h1>
                    </div>
                    <p className="banner-description slide-up-and-fade mt-6 text-lg text-muted-foreground">
                        Hi! I&apos;m{' '}
                        <span className="font-medium text-foreground">
                            Ashik
                        </span>
                        . A dedicated Software Engineer with 5+ years of
                        experience in building high-performance, scalable, and
                        responsive fintech solutions.
                    </p>
                    <div className="mt-9 flex items-center gap-4 slide-up-and-fade">
                        <Button
                            as="link"
                            target="_blank"
                            rel="noopener noreferrer"
                            href={GENERAL_INFO.upworkProfile}
                            variant="primary"
                            className="banner-button"
                        >
                            Hire Me
                        </Button>
                        <Button
                            as="link"
                            href="/assets/Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outline"
                            className="banner-button"
                        >
                            Download CV
                        </Button>
                    </div>
                </div>

                <div className="md:absolute bottom-[10%] right-[4%] flex md:flex-col gap-4 md:gap-8 text-center md:text-right">
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            5+
                        </h5>
                        <p className="text-muted-foreground">
                            Years of Experience
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            10+
                        </h5>
                        <p className="text-muted-foreground">
                            Completed Projects
                        </p>
                    </div>
                    <div className="slide-up-and-fade">
                        <h5 className="text-3xl sm:text-4xl font-anton text-primary mb-1.5">
                            10K+
                        </h5>
                        <p className="text-muted-foreground">Hours Worked</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;
