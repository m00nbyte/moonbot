// modules
import clsx from 'clsx';
import moment from 'moment/min/moment-with-locales';

// components
import CardGrid from 'src/components/global/CardGrid';
import EmptyRow from 'src/components/global/EmptyRow';
import CustomSpinner from 'src/components/global/CustomSpinner';

// strings
import strings from 'src/strings';

// types
import { openOffersTypes } from 'src/types';

const OpenOffers = ({ loading, language, data, cards, handleCancel }) => {
    const localize = strings.offers.open;

    const tableColumns = localize.table.columns;
    const excludeKeys = localize.table.exclude;
    const hideOnMobile = localize.table.noMobile;
    const exchangeFee = 0.15; // 15%

    return (
        <>
            <h1 className={clsx(['mt-2', 'mb-3', 'font-bold', 'text-3xl', 'uppercase'])}>{localize.title}</h1>

            <CardGrid data={cards} />

            {data && data?.funding?.length > 0 && (
                <button
                    type='button'
                    className={clsx([
                        'w-full',
                        'px-5',
                        'py-3',
                        'mt-4',
                        'font-bold',
                        'text-md',
                        'text-white',
                        'bg-rose-600',
                        'hover:bg-rose-700',
                        'transition-all'
                    ])}
                    onClick={(e) => handleCancel(-1)}
                    disabled={loading}
                >
                    {loading ? <CustomSpinner size={6} color={'text-white'} /> : localize.table.cancelAll}
                </button>
            )}

            <table className={clsx(['w-full', 'mt-6', 'border-collapse'])}>
                {data && data?.funding?.length > 0 && (
                    <thead
                        className={clsx([
                            'font-bold',
                            'uppercase',
                            'dark:text-white',
                            'bg-stone-200',
                            'dark:bg-stone-700',
                            'border',
                            'border-stone-400',
                            'dark:border-stone-600'
                        ])}
                    >
                        <tr>
                            {tableColumns.map((item) => (
                                <th
                                    key={`open-offers-table-heading-${item}`}
                                    className={clsx([
                                        'hidden',
                                        'p-3',
                                        'lg:table-cell',
                                        'border-r',
                                        'border-stone-400',
                                        'dark:border-stone-600',
                                        'last:border-none'
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
                        (data?.funding?.length === 0 && <EmptyRow cols={tableColumns.length} text={localize.table.empty} />) ||
                        (data &&
                            data?.funding?.length &&
                            data.funding
                                .map((item) =>
                                    Object.fromEntries(Object.entries(item).filter(([key]) => !excludeKeys.includes(key)))
                                )
                                .map(
                                    (item) => ({
                                        // initial_amount: `${item.initial_amount.toFixed(8)}`,
                                        remaining_amount: `${item.remaining_amount.toFixed(8)}`,
                                        rate: `${(item.rate * 100).toFixed(8)} %`,
                                        period: `${item.period} ${localize.table.period}`,
                                        fees: `${(item.remaining_amount * item.rate * item.period * exchangeFee).toFixed(8)}`,
                                        estimated: `${(
                                            item.remaining_amount *
                                            item.rate *
                                            item.period *
                                            (1 - exchangeFee)
                                        ).toFixed(8)}`,
                                        created: moment(item.created).locale(language).fromNow(),
                                        cancel: item.id
                                    }),
                                    []
                                )
                                .map((row, rIndex) => (
                                    <tr
                                        key={`open-offers-table-row-${rIndex}`}
                                        className={clsx([
                                            'mb-10',
                                            'flex',
                                            'flex-row',
                                            'flex-wrap',
                                            'bg-stone-100',
                                            'dark:bg-stone-800',
                                            'lg:hover:bg-stone-200',
                                            'dark:lg:hover:bg-stone-700',
                                            'lg:table-row',
                                            'lg:flex-row',
                                            'lg:flex-no-wrap',
                                            'lg:mb-0',
                                            'hover:cursor-default'
                                        ])}
                                    >
                                        {Object.keys(row).map((col, cIndex) => (
                                            <td
                                                key={`active-offers-table-${rIndex}-${cIndex}`}
                                                className={clsx([
                                                    'w-full',
                                                    'p-3',
                                                    'relative',
                                                    'block',
                                                    'text-right',
                                                    'lg:text-center',
                                                    'border',
                                                    'border-b',
                                                    'border-stone-400',
                                                    'dark:border-stone-600',
                                                    'lg:w-auto',
                                                    'lg:table-cell',
                                                    'lg:static',
                                                    hideOnMobile.includes(tableColumns[cIndex]) && 'hidden'
                                                ])}
                                            >
                                                {col === 'cancel' ? (
                                                    <button
                                                        type='button'
                                                        className={clsx([
                                                            'w-full',
                                                            'px-3',
                                                            'py-1',
                                                            '-my-1',
                                                            'inline-flex',
                                                            'items-center',
                                                            'justify-center',
                                                            'text-sm',
                                                            'text-white',
                                                            'bg-rose-700',
                                                            'hover:bg-rose-800',
                                                            'transition-all'
                                                        ])}
                                                        onClick={(e) => handleCancel(row[col])}
                                                        disabled={loading}
                                                    >
                                                        {loading ? (
                                                            <CustomSpinner size={5} color={'text-white'} />
                                                        ) : (
                                                            localize.table.cancelOne
                                                        )}
                                                    </button>
                                                ) : (
                                                    <>
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
                                                    </>
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                )))}
                </tbody>
            </table>
        </>
    );
};

OpenOffers.propTypes = openOffersTypes;

export default OpenOffers;
