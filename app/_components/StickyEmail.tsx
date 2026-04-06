'use client';
import { GENERAL_INFO, SOCIAL_LINKS } from '@/lib/data';
import { Facebook, Github, Linkedin, MessageCircle } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react';

const StickyEmail = () => {
    useGSAP(() => {
        gsap.fromTo(
            '.sticky-email-container',
            { x: -50, autoAlpha: 0 },
            { x: 0, autoAlpha: 1, duration: 1, delay: 3.2, ease: 'power4.out' }
        );
    });

    return (
        <div className="sticky-email-container max-[600px]:hidden fixed bottom-10 left-8 flex flex-col items-center gap-6 invisible">
            <div className="flex flex-col gap-4">
                {SOCIAL_LINKS.map((link) => {
                    const Icon = {
                        github: Github,
                        linkedin: Linkedin,
                        facebook: Facebook,
                        whatsapp: MessageCircle,
                    }[link.name as 'github' | 'linkedin' | 'facebook' | 'whatsapp'];

                    if (!Icon) return null;

                    return (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                        >
                            <Icon size={20} />
                        </a>
                    );
                })}
            </div>
            <div className="w-px h-20 bg-muted-foreground/30"></div>
            <a
                href={`mailto:${GENERAL_INFO.email}`}
                className="text-sm text-muted-foreground tracking-[2px] transition-all hover:text-foreground hover:-translate-y-1 block"
                style={{
                    textOrientation: 'mixed',
                    writingMode: 'vertical-rl',
                }}
            >
                {GENERAL_INFO.email}
            </a>
        </div>
    );
};

export default StickyEmail;
