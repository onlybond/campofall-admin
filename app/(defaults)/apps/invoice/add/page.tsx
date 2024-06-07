import ComponentsAppsinvoiceAdd from '@/components/apps/mailbox/invoice/components-apps-invoice-add';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'invoice Add',
};

const invoiceAdd = () => {
    return <ComponentsAppsinvoiceAdd />;
};

export default invoiceAdd;
