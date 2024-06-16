import gsap from 'gsap';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
export const animatePageIn = () => {
    const loader = document.getElementById('load_screen');
    if (loader) {
        gsap.to(loader, { duration: 0.5, opacity: 0, display: 'none', ease: 'power1.out' });
    }
};
export const animatePageOut = (href: string, router: AppRouterInstance) => {
    const loader = document.getElementById('load_screen');
    if (loader) {
        gsap.to(loader, {
            duration: 0.5,
            opacity: 1,
            display: 'flex',
            ease: 'power1.out',
            onComplete: () => {
                router.push(href);
            },
        });
    }
};
