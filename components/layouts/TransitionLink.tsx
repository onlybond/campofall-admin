'use client';

import { animatePageOut } from '@/utils/animations';
import Link from 'next/link';

import { useRouter, usePathname } from 'next/navigation';

interface ITransitionLinkProps {
    href: string;
    children?: React.ReactNode;
    className?: string;
}

export default function TransitionLink({ href, children ,className}: ITransitionLinkProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleClick = () => {
        if (pathname !== href) {
            animatePageOut(href, router);
        }
    };
    return (
        <Link href={href} onClick={handleClick} className={className}>
            {children}
        </Link>
    );
}
