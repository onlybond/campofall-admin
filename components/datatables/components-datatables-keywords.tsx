'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconPencil from '@/components/icon/icon-pencil';
import IconCircleCheck from '@/components/icon/icon-circle-check';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

const rowData = [
    {
        id: 1,
        keywords: 'Caroline',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        phone: '+1 (821) 447-3782',
        isActive: true,
        click: 39,
        date: '15 Dec 2020',
    },
    {
        id: 2,
        keywords: 'Celeste',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        phone: '+1 (838) 515-3408',
        isActive: false,
        click: 39,
        date: '15 Dec 2020',
    },
    {
        id: 3,
        keywords: 'Tillman',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        phone: '+1 (969) 496-2892',
        isActive: false,
        click: 39,
        date: '15 Dec 2020',
    },
    {
        id: 4,
        keywords: 'Daisy',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        phone: '+1 (861) 564-2877',
        isActive: true,
        click: 39,
        date: '15 Dec 2020',
    },
];
const Keywords = () => {
    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState(initialRecords);
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };
    const [selectedRecords, setSelectedRecords] = useState<any>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.id.toString().includes(search.toLowerCase()) ||
                    item.keywords.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
    }, [sortStatus]);

    return (
        <div className="panel mt-6">
            <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                <h5 className="text-lg font-semibold dark:text-white-light">Checkbox</h5>
                <div className="ltr:ml-auto rtl:mr-auto">
                    <input type="text" className="form-input w-auto" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
            </div>
            <div className="datatables">
                <DataTable
                    className="table-hover whitespace-nowrap"
                    records={recordsData}
                    columns={[
                        { accessor: 'id', sortable: true },
                        { accessor: 'keywords', title: 'Keywords ', sortable: true },
                        { accessor: 'email', title: 'Email ', sortable: true },
                        { accessor: 'click', title: 'Click ', sortable: true },
                        { accessor: 'date', title: 'Date', sortable: true },
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
                                    <Tippy content="Edit">
                                        <button type="button">
                                            <IconPencil className="text-success" />
                                        </button>
                                    </Tippy>

                                    <Tippy content="Delete">
                                        <button type="button">
                                            <IconTrashLines className="text-danger" />
                                        </button>
                                    </Tippy>
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
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                />
            </div>
        </div>
    );
};

export default Keywords;
