'use client';
import SectionTitle from '@/components/SectionTitle';
import { MY_EXPERIENCE } from '@/lib/data';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useRef, useState, MouseEvent } from 'react';
import { cn } from '@/lib/utils';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Experiences = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredExperience, setHoveredExperience] = useState<string | null>(null);

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 50%',
                    toggleActions: 'restart none none reverse',
                    scrub: 1,
                },
            });

            tl.from('.experience-item', {
                y: 50,
                opacity: 0,
                stagger: 0.3,
            });
        },
        { scope: containerRef },
    );

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'bottom 50%',
                    end: 'bottom 20%',
                    scrub: 1,
                },
            });

            tl.to(containerRef.current, {
                y: -150,
                opacity: 0,
            });
        },
        { scope: containerRef },
    );

    const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const follower = containerRef.current.querySelector('.image-follower');
        if (!follower) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(follower, {
            x: x + 20,
            y: y - 100,
            duration: 0.6,
            ease: 'power3.out',
        });
    };

    return (
        <section className="py-section relative" id="my-experience" onMouseMove={handleMouseMove}>
            <div className="container" ref={containerRef}>
                <SectionTitle title="My Experience" />

                <div className="grid gap-14 relative group/exp">
                    {/* Hover Image Follower */}
                    <div 
                        className={cn(
                            "image-follower pointer-events-none absolute z-10 w-64 aspect-video overflow-hidden rounded-lg border border-primary/20 bg-background transition-opacity duration-300",
                            hoveredExperience ? "opacity-100" : "opacity-0"
                        )}
                    >
                        {MY_EXPERIENCE.map((exp) => (
                            <img
                                key={`${exp.company}-${exp.title}`}
                                src={`/projects/thumbnail/${exp.company.toLowerCase().replace(/ /g, '-')}.webp`}
                                alt={exp.company}
                                className={cn(
                                    "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
                                    hoveredExperience === exp.company ? "opacity-100" : "opacity-0"
                                )}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = '/projects/thumbnail/zkb.webp';
                                }}
                            />
                        ))}
                    </div>

                    {MY_EXPERIENCE.map((item) => (
                        <div 
                            key={`${item.company}-${item.role_type}`} 
                            className="experience-item relative"
                            onMouseEnter={() => setHoveredExperience(item.company)}
                            onMouseLeave={() => setHoveredExperience(null)}
                        >
                            <p className="text-xl text-muted-foreground">
                                {item.company}
                            </p>
                            <p className="text-5xl font-anton leading-none mt-3.5 mb-2.5">
                                {item.title}
                            </p>
                            <p className="text-lg text-muted-foreground flex justify-between">
                                <span>{item.duration}</span>
                                <span className="opacity-60 text-sm uppercase tracking-widest">{item.location}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experiences;
