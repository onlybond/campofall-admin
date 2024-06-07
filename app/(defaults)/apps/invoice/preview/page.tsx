import ComponentsAppsinvoicePreview from '@/components/apps/mailbox/invoice/components-apps-invoice-preview';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'invoice Preview',
};

const invoicePreview = () => {
    return <ComponentsAppsinvoicePreview />;
};

export default invoicePreview;
