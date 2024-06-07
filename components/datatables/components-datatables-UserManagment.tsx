'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconXCircle from '@/components/icon/icon-x-circle';
import IconSettings from '@/components/icon/icon-settings';
import IconPencil from '@/components/icon/icon-pencil';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import IconCircleCheck from '@/components/icon/icon-circle-check';

const rowData = [
    {
        id: 1,
        firstName: 'Caroline',
        lastName: 'Jensen',
        email: 'carolinejensen@zidant.com',
        dob: '2004-05-28',
        address: {
            street: '529 Scholes Street',
            city: 'Temperanceville',
            zipcode: 5235,
            geo: {
                lat: 23.806115,
                lng: 164.677197,
            },
        },
        phone: '+1 (821) 447-3782',
        isActive: true,
        age: 39,
        company: 'POLARAX',
    },
    {
        id: 2,
        firstName: 'Celeste',
        lastName: 'Grant',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
        address: {
            street: '639 Kimball Street',
            city: 'Bascom',
            zipcode: 8907,
            geo: {
                lat: 65.954483,
                lng: 98.906478,
            },
        },
        phone: '+1 (838) 515-3408',
        isActive: false,
        age: 32,
        company: 'MANGLO',
    },
    {
        id: 3,
        firstName: 'Tillman',
        lastName: 'Forbes',
        email: 'tillmanforbes@manglo.com',
        dob: '2016-09-05',
        address: {
            street: '240 Vandalia Avenue',
            city: 'Thynedale',
            zipcode: 8994,
            geo: {
                lat: -34.949388,
                lng: -82.958111,
            },
        },
        phone: '+1 (969) 496-2892',
        isActive: false,
        age: 26,
        company: 'APPLIDECK',
    },
    {
        id: 4,
        firstName: 'Daisy',
        lastName: 'Whitley',
        email: 'daisywhitley@applideck.com',
        dob: '1987-03-23',
        address: {
            street: '350 Pleasant Place',
            city: 'Idledale',
            zipcode: 9369,
            geo: {
                lat: -54.458809,
                lng: -127.476556,
            },
        },
        phone: '+1 (861) 564-2877',
        isActive: true,
        age: 21,
        company: 'VOLAX',
    },
];

const UserManagment = () => {
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const [isChecked, setIsChecked] = useState(false);
    const handleToggle = () => {
        setIsChecked(!isChecked);
    };

    const [page, setPage] = useState(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState(sortBy(rowData, 'firstName'));
    const [recordsData, setRecordsData] = useState(initialRecords);

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
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        setInitialRecords(() => {
            return rowData.filter((item) => {
                return (
                    item.firstName.toLowerCase().includes(search.toLowerCase()) ||
                    item.company.toLowerCase().includes(search.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search.toLowerCase()) ||
                    item.email.toLowerCase().includes(search.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search.toLowerCase())
                );
            });
        });
    }, [search]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const [page2, setPage2] = useState(1);
    const [pageSize2, setPageSize2] = useState(PAGE_SIZES[0]);
    const [initialRecords2, setInitialRecords2] = useState(sortBy(rowData, 'firstName'));
    const [recordsData2, setRecordsData2] = useState(initialRecords2);

    const [search2, setSearch2] = useState('');
    const [sortStatus2, setSortStatus2] = useState<DataTableSortStatus>({
        columnAccessor: 'firstName',
        direction: 'asc',
    });

    useEffect(() => {
        setPage2(1);
    }, [pageSize2]);

    useEffect(() => {
        const from = (page2 - 1) * pageSize2;
        const to = from + pageSize2;
        setRecordsData2([...initialRecords2.slice(from, to)]);
    }, [page2, pageSize2, initialRecords2]);

    useEffect(() => {
        setInitialRecords2(() => {
            return rowData.filter((item: any) => {
                return (
                    item.firstName.toLowerCase().includes(search2.toLowerCase()) ||
                    item.company.toLowerCase().includes(search2.toLowerCase()) ||
                    item.age.toString().toLowerCase().includes(search2.toLowerCase()) ||
                    item.dob.toLowerCase().includes(search2.toLowerCase()) ||
                    item.email.toLowerCase().includes(search2.toLowerCase()) ||
                    item.phone.toLowerCase().includes(search2.toLowerCase())
                );
            });
        });
    }, [search2]);

    useEffect(() => {
        const data2 = sortBy(initialRecords2, sortStatus2.columnAccessor);
        setInitialRecords2(sortStatus2.direction === 'desc' ? data2.reverse() : data2);
    }, [sortStatus2]);

    const formatDate = (date: string | number | Date) => {
        if (date) {
            const dt = new Date(date);
            const month = dt.getMonth() + 1 < 10 ? '0' + (dt.getMonth() + 1) : dt.getMonth() + 1;
            const day = dt.getDate() < 10 ? '0' + dt.getDate() : dt.getDate();
            return day + '/' + month + '/' + dt.getFullYear();
        }
        return '';
    };

    const randomColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = ['PAID', 'APPROVED', 'FAILED', 'CANCEL', 'SUCCESS', 'PENDING', 'COMPLETE'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };

    return (
        <>
            <div className="panel mt-6">
                <div className="mb-5 flex flex-col gap-5 md:flex-row md:items-center">
                    <h5 className="text-lg font-semibold dark:text-white-light">User Manegment</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <input type="text" className="form-input w-auto" placeholder="Search..." value={search2} onChange={(e) => setSearch2(e.target.value)} />
                    </div>
                </div>
                <div className="datatables">
                    {isMounted && (
                        <DataTable
                            className="table-hover whitespace-nowrap"
                            records={recordsData2}
                            columns={[
                                { accessor: 'id', title: 'ID', sortable: true },
                                {
                                    accessor: 'firstName',
                                    title: 'Name',
                                    sortable: true,
                                    render: ({ firstName, lastName, id }) => (
                                        <div className="flex w-max items-center">
                                            <img className="h-9 w-9 rounded-full object-cover ltr:mr-2 rtl:ml-2" src={`/assets/images/profile-${id}.jpeg`} alt="" />
                                            <div>{firstName + ' ' + lastName}</div>
                                        </div>
                                    ),
                                },

                                { accessor: 'email', title: 'Email', sortable: true },

                                { accessor: 'phone', title: 'Phone No.', sortable: true },
                                {
                                    accessor: 'dob',
                                    title: 'Start Date',
                                    sortable: true,
                                    render: ({ dob }) => <div>{formatDate(dob)}</div>,
                                },
                                {
                                    accessor: 'action',
                                    title: 'Action',
                                    titleClassName: '!text-center',
                                    render: () => (
                                        <div className="mx-auto flex w-max items-center gap-2">
                                            <Tippy content={isChecked ? 'Delete' : 'Correct'}>
                                                <button type="button" onClick={handleToggle}>
                                                    {isChecked ? <IconXCircle className="h-5 w-5 text-danger" /> : <IconCircleCheck className="h-5 w-5 text-primary" />}
                                                </button>
                                            </Tippy>

                                            <Tippy content="Settings">
                                                <button type="button">
                                                    <IconSettings className="h-5 w-5 text-primary" />
                                                </button>
                                            </Tippy>
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
                            totalRecords={initialRecords2.length}
                            recordsPerPage={pageSize2}
                            page={page2}
                            onPageChange={(p) => setPage2(p)}
                            recordsPerPageOptions={PAGE_SIZES}
                            onRecordsPerPageChange={setPageSize2}
                            sortStatus={sortStatus2}
                            onSortStatusChange={setSortStatus2}
                            minHeight={200}
                            paginationText={({ from, to, totalRecords }) => `Showing  ${from} to ${to} of ${totalRecords} entries`}
                        />
                    )}
                </div>
            </div>
        </>
    );
};

export default UserManagment;
