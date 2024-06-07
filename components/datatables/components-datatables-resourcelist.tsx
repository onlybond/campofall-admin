'use client';

import IconEye from '@/components/icon/icon-eye';
import IconPlus from '@/components/icon/icon-plus';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconPencil from '@/components/icon/icon-pencil';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import { sortBy } from 'lodash';
import { DataTableSortStatus, DataTable } from 'mantine-datatable';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Resourcelist = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            invoice: '081451',
            resource_name: 'google',
            resource_Type: 'websearch',
            keywords: '#pavan',
            user_email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            clicks: '227',
            status: { tooltip: 'completed', color: 'success' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 2,
            invoice: '081451',
            resource_name: 'google',
            resource_Type: 'websearch',
            keywords: '#pavan',
            user_email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            clicks: '227',
            status: { tooltip: 'pending', color: 'danger' },
            profile: 'profile-1.jpeg',
        },
        {
            id: 3,
            invoice: '081451',
            resource_name: 'google',
            resource_Type: 'websearch',
            keywords: '#pavan',
            user_email: 'lauriefox@company.com',
            date: '15 Dec 2020',
            clicks: '227',
            status: { tooltip: 'completed', color: 'success' },
            profile: 'profile-1.jpeg',
        },
    ]);

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(items, 'invoice'));
    const [records, setRecords] = useState(initialRecords);
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecords([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return items.filter((item) => {
                return (
                    item.invoice.toLowerCase().includes(search.toLowerCase()) ||
                    item.resource_name.toLowerCase().includes(search.toLowerCase()) ||
                    item.user_email.toLowerCase().includes(search.toLowerCase()) ||
                    item.date.toLowerCase().includes(search.toLowerCase()) ||
                    item.clicks.toLowerCase().includes(search.toLowerCase()) ||
                    item.status.tooltip.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
        setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
        setPage(1);
    }, [sortStatus]);

    const deleteRow = (id: any = null) => {
        if (window.confirm('Are you sure want to delete selected row ?')) {
            if (id) {
                setRecords(items.filter((user) => user.id !== id));
                setInitialRecords(items.filter((user) => user.id !== id));
                setItems(items.filter((user) => user.id !== id));
                setSelectedRecords([]);
                setSearch('');
            } else {
                let selectedRows = selectedRecords || [];
                const ids = selectedRows.map((d: any) => {
                    return d.id;
                });
                const result = items.filter((d) => !ids.includes(d.id as never));
                setRecords(result);
                setInitialRecords(result);
                setItems(result);
                setSelectedRecords([]);
                setSearch('');
                setPage(1);
            }
        }
    };

    return (
        <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
            <div className="invoice-table">
                <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
                    <div className="flex items-center gap-2">
                        <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
                            <IconTrashLines />
                            Delete
                        </button>
                        <Link href="/apps/invoice/add" className="btn btn-primary gap-2">
                            <IconPlus />
                            Add New
                        </Link>
                    </div>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>
                </div>

                <div className="datatables pagination-padding">
                    <DataTable
                        className="table-hover whitespace-nowrap"
                        records={records}
                        columns={[
                            { accessor: 'id', title: 'ID', sortable: true },
                            {
                                accessor: 'Resource Name',
                                sortable: true,
                                render: ({ resource_name, id }) => (
                                    <div className="flex items-center font-semibold">
                                        <div className="w-max rounded-full bg-white-dark/30 p-0.5 ltr:mr-2 rtl:ml-2">
                                            <img className="h-8 w-8 rounded-full object-cover" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                        </div>
                                        <div>{resource_name}</div>
                                    </div>
                                ),
                            },
                            { accessor: 'resource_Type', title: 'Resource Type', sortable: true },
                            { accessor: 'keywords', title: 'keywords ', sortable: true },
                            {
                                accessor: 'user_email',
                                sortable: true,
                            },
                            {
                                accessor: 'date',
                                sortable: true,
                            },
                            {
                                accessor: 'amount',
                                sortable: true,
                                titleClassName: 'text-right',
                                render: ({ clicks }) => <div className="text-right font-semibold">{`${clicks}`}</div>,
                            },
                            {
                                accessor: 'status',
                                sortable: true,
                                render: ({ status }) => <span className={`badge badge-outline-${status.color} `}>{status.tooltip}</span>,
                            },
                            {
                                accessor: 'action',
                                title: 'Actions',
                                sortable: false,
                                textAlignment: 'center',
                                render: ({ id }) => (
                                    <div className="mx-auto flex w-max items-center gap-4">
                                        <button type="button" onClick={handleToggle}>
                                            {isChecked ? <IconXCircle className="h-5 w-5 text-danger" /> : <IconCircleCheck className="h-5 w-5 text-primary" />}
                                        </button>
                                        <Link href="/apps/invoice/edit" className="flex hover:text-info">
                                            <IconPencil className="text-success" />
                                        </Link>
                                        <Link href="/apps/invoice/preview" className="text-success">
                                            <IconEye />
                                        </Link>
                                        <button type="button" className="flex hover:text-danger" onClick={(e) => deleteRow(id)}>
                                            <IconTrashLines className="text-danger" />
                                        </button>
                                    </div>
                                ),
                            },
                        ]}
                        highlightOnHover
                        totalRecords={initialRecords.length}
                        recordsPerPage={pageSize}
                        page={page}
                        onPageChange={(p) => setPage(p)}
                        recordsPerPageOptions={PAGE_SIZES}
                        onRecordsPerPageChange={setPageSize}
                        sortStatus={sortStatus}
                        onSortStatusChange={setSortStatus}
                        selectedRecords={selectedRecords}
                        onSelectedRecordsChange={setSelectedRecords}
                        paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Resourcelist;
