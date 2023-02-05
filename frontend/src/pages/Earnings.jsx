// modules
import clsx from 'clsx';
import moment from 'moment';
import shallow from 'zustand/shallow';

// functions
import cardsList from 'src/functions/cardsList';
import json2csv from 'src/functions/json2csv';
import downloadFile from 'src/functions/downloadFile';

// components
import EmptyRow from 'src/components/global/EmptyRow';
import CardGrid from 'src/components/global/CardGrid';
import AreaChart from 'src/components/charts/AreaChart';
import AlertBox from 'src/components/global/AlertBox';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { earningsPageTypes } from 'src/types';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    loading: state.loading,
    update: state.update,
    token: state.auth.token,
    currentCoin: state.current,
    earnings: state.earnings,
    theme: state.theme,
    dispatch: state.dispatch
});

const Earnings = ({ data, handleUpdate }) => {
    const { loading, update, token, currentCoin, earnings, theme, dispatch } = useStore(stateSelector, shallow);
    const { hasNextPage, hasPrevPage, limit, nextPage, page, prevPage, totalDocs, totalPages } = data.earningsList;
    const localize = strings.earnings;

    const tableColumns = localize.table.columns;
    const excludeItems = localize.table.exclude;
    const hideOnMobile = localize.table.noMobile;

    const earnCards = cardsList('earnings', data);

    const downloadExport = async (data) => {
        try {
            const res = await fetch(`${API_URL}/api/data/export`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            return { status: true, json };
        } catch (error) {
            return { status: false, message: 'failedBackend' };
        }
    };

    const handleCsvExport = async () => {
        handleUpdate(true);

        const data = await downloadExport({ currency: currentCoin });

        if (data.status) {
            downloadFile({
                data: json2csv(data.json),
                fileName: 'earnings.csv',
                fileType: 'text/csv'
            });
        } else {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: data.message }
            });
        }

        handleUpdate(false);
    };

    const changePage = async (data) => {
        try {
            const res = await fetch(`${API_URL}/api/data/earnings`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            return { status: true, json };
        } catch (error) {
            return { status: false, message: 'failedBackend' };
        }
    };

    const handlePage = async (p) => {
        handleUpdate(true);

        const data = await changePage({
            currency: currentCoin,
            page: p,
            limit: limit
        });

        if (data.status) {
            dispatch({
                type: 'earnings',
                value: {
                    ...earnings,
                    earningsList: data.json
                }
            });
        } else {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: data.message }
            });
        }

        handleUpdate(false);
    };

    return (
        <>
            <div className={clsx(['tour-earnings'])}>
                <h1 className={clsx(['mt-2', 'mb-3', 'font-bold', 'text-3xl', 'uppercase'])}>{localize.title}</h1>

                <CardGrid data={earnCards} />
            </div>

            <div className={clsx(['mt-4'])}>
                <AlertBox type={'info'} icon={'i-[mdi-bell-notification-outline]'} text={localize.info} />
            </div>

            {(!loading && data && data?.earnings30d?.length && (
                <div
                    className={clsx([
                        'p-4',
                        'mt-4',
                        'bg-stone-100',
                        'dark:bg-stone-800',
                        'border',
                        'border-stone-300',
                        'dark:border-stone-700'
                    ])}
                >
                    <h2 className={clsx(['mb-3', 'font-bold', 'text-xl', 'uppercase'])}>{localize.chart.title}</h2>

                    <AreaChart
                        theme={theme}
                        title='earnings-30d'
                        labelName={localize.chart.tooltip.label}
                        labels={data?.earnings30d.map((item) => moment(item.mts).format('DD/MM/YYYY'), []).reverse()}
                        data={data?.earnings30d.map((item) => item.amount, []).reverse()}
                    />
                </div>
            )) ||
                ''}

            {(!loading && data && data?.earningsList?.docs?.length > 0 && (
                <div
                    className={clsx([
                        'p-4',
                        'mt-8',
                        'bg-stone-100',
                        'dark:bg-stone-800',
                        'border',
                        'border-stone-300',
                        'dark:border-stone-700'
                    ])}
                >
                    <div className={clsx(['mb-3', 'flex', 'items-center', 'justify-between'])}>
                        <span className={clsx(['font-bold', 'text-xl', 'uppercase'])}>{localize.table.title}</span>
                        <button
                            className={clsx([
                                'flex',
                                'space-x-2',
                                'items-center',
                                'hover:text-stone-700',
                                'dark:hover:text-stone-300'
                            ])}
                            onClick={handleCsvExport}
                        >
                            <div className={clsx(['flex', 'space-x-2', 'items-center'])}>
                                <span className={clsx(['text-xs'])}>{localize.table.settings.export}</span>
                                <span className={clsx(['font-semibold', 'text-sm'])}>{totalDocs}</span>
                                <span className={clsx(['text-xs'])}>{localize.table.settings.entries}</span>
                            </div>
                            <div className={clsx(['i-[ph-arrow-right]'])} />
                            <div className={clsx(['i-[ph-file-csv]', 'text-3xl'])} />
                        </button>
                    </div>

                    <table className={clsx(['w-full', 'border-collapse'])}>
                        {data && data?.earningsList?.docs?.length > 0 && (
                            <thead
                                className={clsx([
                                    'font-bold',
                                    'dark:text-white',
                                    'uppercase',
                                    'bg-stone-200',
                                    'dark:bg-stone-700',
                                    'border',
                                    'border-stone-400',
                                    'dark:border-stone-600'
                                ])}
                            >
                                <tr>
                                    {tableColumns.map((item, index) => (
                                        <th
                                            key={`earnings-table-heading-${item}`}
                                            className={clsx([
                                                'p-3',
                                                'hidden',
                                                'lg:table-cell',
                                                'border-r',
                                                'border-stone-400',
                                                'dark:border-stone-600',
                                                'last:border-none',
                                                2 % index === 0 ? 'text-right' : 'text-left'
                                            ])}
                                        >
                                            {item}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody>
                            {(loading && <EmptyRow cols={tableColumns.length} text={localize.table.loading} />) ||
                                (data?.earningsList?.docs?.length === 0 && (
                                    <EmptyRow cols={tableColumns.length} text={localize.table.empty} />
                                )) ||
                                (data &&
                                    data?.earningsList?.docs?.length &&
                                    data.earningsList.docs
                                        .map((item) =>
                                            Object.fromEntries(
                                                Object.entries(item).filter(([key]) => !excludeItems.includes(key))
                                            )
                                        )
                                        .map(
                                            (item) => ({
                                                date: moment(item.mts).format('DD/MM/YYYY'),
                                                amount: item.amount.toFixed(8)
                                            }),
                                            []
                                        )
                                        .map((row, rIndex) => (
                                            <tr
                                                key={`earnings-row-${rIndex}`}
                                                className={clsx([
                                                    'mb-10',
                                                    'lg:mb-0',
                                                    'flex',
                                                    'flex-row',
                                                    'flex-wrap',
                                                    'lg:table-row',
                                                    'lg:flex-row',
                                                    'lg:flex-no-wrap',
                                                    'bg-stone-100',
                                                    'dark:bg-stone-800',
                                                    'lg:hover:bg-stone-200',
                                                    'dark:lg:hover:bg-stone-700',
                                                    'hover:cursor-default'
                                                ])}
                                            >
                                                {Object.keys(row).map((col, cIndex) => (
                                                    <td
                                                        key={`earnings-table-${rIndex}-${cIndex}`}
                                                        className={clsx([
                                                            'w-full',
                                                            'lg:w-auto',
                                                            'p-3',
                                                            'block',
                                                            'relative',
                                                            'lg:static',
                                                            'lg:table-cell',
                                                            'text-right',
                                                            'border',
                                                            'border-b',
                                                            'border-stone-400',
                                                            'dark:border-stone-600',
                                                            cIndex === 0 && 'lg:text-left',
                                                            hideOnMobile.includes(tableColumns[cIndex]) && 'hidden'
                                                        ])}
                                                    >
                                                        <span
                                                            className={clsx([
                                                                'px-2',
                                                                'py-1',
                                                                'top-0',
                                                                'left-0',
                                                                'absolute',
                                                                'font-bold',
                                                                'text-xs',
                                                                'text-white',
                                                                'uppercase',
                                                                'bg-stone-700',
                                                                'lg:hidden'
                                                            ])}
                                                        >
                                                            {tableColumns[cIndex]}
                                                        </span>
                                                        <span className={clsx(['font-fira', 'text-sm'])}>{row[col]}</span>
                                                    </td>
                                                ))}
                                            </tr>
                                        )))}
                        </tbody>
                    </table>

                    {(totalPages > 1 && (
                        <div className={clsx(['mt-7', 'grid', 'lg:grid-cols-3', hasPrevPage ? 'grid-cols-2' : 'grid-cols-1'])}>
                            <div>
                                {hasPrevPage && (
                                    <button
                                        className={clsx([
                                            'px-4',
                                            'py-2',
                                            'text-stone-700',
                                            'dark:text-stone-200',
                                            'dark:hover:text-white',
                                            'bg-stone-300',
                                            'dark:bg-stone-700',
                                            'hover:bg-stone-200',
                                            'dark:hover:bg-stone-600',
                                            'border',
                                            'border-stone-400',
                                            'dark:border-stone-600'
                                        ])}
                                        onClick={() => handlePage(prevPage)}
                                        disabled={loading || update}
                                    >
                                        <div className={clsx(['i-[ph-arrow-left]', 'w-6', 'h-6'])} />
                                    </button>
                                )}
                            </div>
                            <div
                                className={clsx([
                                    'hidden',
                                    'lg:flex',
                                    'space-x-2',
                                    'justify-center',
                                    (!hasPrevPage || page === 2) && 'ml-[3.4rem]',
                                    (!hasNextPage || page === totalPages - 1) && 'mr-[3.4rem]'
                                ])}
                            >
                                {page > 2 && (
                                    <span
                                        className={clsx([
                                            'px-2',
                                            'py-2',
                                            'font-fira',
                                            'text-stone-700',
                                            'dark:text-stone-100',
                                            'bg-stone-100',
                                            'dark:bg-stone-800',
                                            'border',
                                            'border-stone-200',
                                            'dark:border-stone-700',
                                            'cursor-default'
                                        ])}
                                    >
                                        ...
                                    </span>
                                )}
                                {page > 1 && (
                                    <>
                                        {page === totalPages && (
                                            <button
                                                className={clsx([
                                                    'px-4',
                                                    'py-2',
                                                    'font-fira',
                                                    'text-stone-700',
                                                    'dark:text-stone-200',
                                                    'dark:hover:text-white',
                                                    'bg-stone-300',
                                                    'dark:bg-stone-700',
                                                    'hover:bg-stone-200',
                                                    'dark:hover:bg-stone-600',
                                                    'border',
                                                    'border-stone-400',
                                                    'dark:border-stone-600'
                                                ])}
                                                onClick={() => handlePage(page - 2)}
                                                disabled={loading || update}
                                            >
                                                {page - 2}
                                            </button>
                                        )}
                                        <button
                                            className={clsx([
                                                'px-4',
                                                'py-2',
                                                'font-fira',
                                                'text-stone-700',
                                                'dark:text-stone-200',
                                                'dark:hover:text-white',
                                                'bg-stone-300',
                                                'dark:bg-stone-700',
                                                'hover:bg-stone-200',
                                                'dark:hover:bg-stone-600',
                                                'border',
                                                'border-stone-400',
                                                'dark:border-stone-600'
                                            ])}
                                            onClick={() => handlePage(page - 1)}
                                            disabled={loading || update}
                                        >
                                            {page - 1}
                                        </button>
                                    </>
                                )}
                                {page > 0 &&
                                    Array(totalPages > page + 1 ? (page === 1 ? 3 : 2) : totalPages - page + 1)
                                        .fill(null)
                                        .map((_, i) => page + i)
                                        .map((item, index) => (
                                            <button
                                                key={`earnings-pagination-${index}`}
                                                className={clsx([
                                                    'px-4',
                                                    'py-2',
                                                    'font-fira',
                                                    'text-stone-700',
                                                    'border',
                                                    'border-stone-400',
                                                    'dark:border-stone-600',
                                                    page === item
                                                        ? ['dark:text-stone-100', 'bg-stone-100', 'dark:bg-stone-500']
                                                        : [
                                                              'dark:text-stone-200',
                                                              'dark:hover:text-white',
                                                              'bg-stone-300',
                                                              'dark:bg-stone-700',
                                                              'hover:bg-stone-200',
                                                              'dark:hover:bg-stone-600'
                                                          ]
                                                ])}
                                                onClick={() => page !== item && handlePage(item)}
                                                disabled={loading || update}
                                            >
                                                {item}
                                            </button>
                                        ))}
                                {totalPages > page + 1 && (
                                    <span
                                        className={clsx([
                                            'px-2',
                                            'py-2',
                                            'font-fira',
                                            'text-stone-700',
                                            'dark:text-stone-100',
                                            'bg-stone-100',
                                            'dark:bg-stone-800',
                                            'border',
                                            'border-stone-200',
                                            'dark:border-stone-700',
                                            'cursor-default'
                                        ])}
                                    >
                                        ...
                                    </span>
                                )}
                            </div>
                            <div>
                                {hasNextPage && (
                                    <button
                                        className={clsx([
                                            'px-4',
                                            'py-2',
                                            'float-right',
                                            'font-fira',
                                            'text-stone-700',
                                            'dark:text-stone-200',
                                            'dark:hover:text-white',
                                            'bg-stone-300',
                                            'dark:bg-stone-700',
                                            'hover:bg-stone-200',
                                            'dark:hover:bg-stone-600',
                                            'border',
                                            'border-stone-400',
                                            'dark:border-stone-600'
                                        ])}
                                        onClick={() => handlePage(nextPage)}
                                        disabled={loading || update}
                                    >
                                        <div className={clsx(['i-[ph-arrow-right]', 'w-6', 'h-6'])} />
                                    </button>
                                )}
                            </div>
                        </div>
                    )) || (
                        <div
                            className={clsx([
                                'pt-4',
                                'mt-7',
                                'text-sm',
                                'text-center',
                                'border-t',
                                'border-stone-300',
                                'dark:border-stone-700'
                            ])}
                        >
                            {localize.table.end}
                        </div>
                    )}
                </div>
            )) || (
                <div
                    className={clsx([
                        'p-4',
                        'mt-8',
                        'bg-stone-100',
                        'dark:bg-stone-800',
                        'border-stone-200',
                        'dark:border-stone-700'
                    ])}
                >
                    {loading ? localize.table.loading : localize.table.empty}
                </div>
            )}
        </>
    );
};

Earnings.propTypes = earningsPageTypes;

export default Earnings;
