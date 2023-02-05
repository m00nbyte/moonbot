// modules
import clsx from 'clsx';
import moment from 'moment/min/moment-with-locales';

// components
import CardGrid from 'src/components/global/CardGrid';
import EmptyRow from 'src/components/global/EmptyRow';

// strings
import strings from 'src/strings';

// types
import { activeOffersTypes } from 'src/types';

const ActiveOffers = ({ loading, language, data, cards }) => {
    const localize = strings.offers.active;

    const tableColumns = localize.table.columns;
    const excludeKeys = localize.table.exclude;
    const hideOnMobile = localize.table.noMobile;
    const exchangeFee = 0.15; // 15%

    return (
        <>
            <h1 className={clsx(['mt-2', 'mb-3', 'font-bold', 'text-3xl', 'uppercase'])}>{localize.title}</h1>

            <CardGrid data={cards.active} />
            <CardGrid data={cards.estimate} />
            <CardGrid data={cards.rates} />

            <table className={clsx(['w-full', 'mt-6', 'border-collapse'])}>
                {data && data?.lending?.length > 0 && (
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
                            {tableColumns.map((item) => (
                                <th
                                    key={`active-offers-table-heading-${item}`}
                                    className={clsx([
                                        'p-3',
                                        'hidden',
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
                        (data?.lending?.length === 0 && <EmptyRow cols={tableColumns.length} text={localize.table.empty} />) ||
                        (data &&
                            data?.lending?.length &&
                            data.lending
                                .map((item) =>
                                    Object.fromEntries(Object.entries(item).filter(([key]) => !excludeKeys.includes(key)))
                                )
                                .map(
                                    (item) => ({
                                        amount: `${item.amount.toFixed(8)}`,
                                        rate: `${(item.rate * 100).toFixed(8)} %`,
                                        apy: `${(item.rate * 100 * 365).toFixed(2)} %`,
                                        fees: `${(item.amount * item.rate * item.period * exchangeFee).toFixed(8)}`,
                                        yld: `${(
                                            item.amount *
                                            item.rate *
                                            (item.period -
                                                parseFloat(moment(item.exp).diff(moment.now(), 'days', true).toFixed(2))) *
                                            (1 - exchangeFee)
                                        ).toFixed(8)}`,
                                        estimated: `${(item.amount * item.rate * item.period * (1 - exchangeFee)).toFixed(8)}`,
                                        expires: moment(item.exp).locale(language).fromNow()
                                    }),
                                    []
                                )
                                .map((row, rIndex) => (
                                    <tr
                                        key={`active-offers-table-row-${rIndex}`}
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
                                                    'block',
                                                    'relative',
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
        </>
    );
};

ActiveOffers.propTypes = activeOffersTypes;

export default ActiveOffers;
