import ComponentsAppsinvoiceEdit from '@/components/apps/mailbox/invoice/components-apps-invoice-edit';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
    title: 'invoice Edit',
};

const invoiceEdit = () => {
    return <ComponentsAppsinvoiceEdit />;
};

export default invoiceEdit;
