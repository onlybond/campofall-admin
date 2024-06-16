'use client';

import Loading from '@/components/layouts/loading';
import { animatePageIn } from '@/utils/animations';
import React, { useEffect } from 'react';

export default function Template({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        animatePageIn()
    }, [])
    return (
        <div>
            <div className='min-h-full w-full fixed flex justify-center items-center bg-inherit z-10' id='load_screen'>
                <Loading />
            </div>
            {children}
        </div>
    );
}
