import UserManagment from '@/components/datatables/components-datatables-UserManagment';

import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'Multiple Tables',
};

const MultipleTables = () => {
    return (
        <div>
            <UserManagment />
        </div>
    );
};

export default MultipleTables;
