import Resourcelist from '@/components/datatables/components-datatables-resourcelist';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'invoice List',
};

const invoiceList = () => {
    return <Resourcelist />;
};

export default invoiceList;
