// strings
import strings from 'src/strings';

const averageOfList = (array) => (array.length && array.reduce((a, b) => a + b) / array.length) || 0;
const formatNumber = (n, decimal, appendix) => [n.toFixed(decimal > -1 ? decimal : 8) || '0.00000000', appendix].join(' ');

const cardsList = (type, data) => {
    const localize = strings.cards;

    const labels = localize[type];
    const exchangeFees = 0.15;

    // #region active_offers
    if (type === 'active') {
        const { currency, lending = [] } = data;

        const totalAmount = lending.reduce((sum, current) => sum + current.amount, 0);
        const estimatedTotal = lending.reduce((sum, current) => sum + current.amount * current.rate * current.period, 0);

        const activeAmount = formatNumber(totalAmount, 8, currency);
        const estimatedFees = formatNumber(estimatedTotal * exchangeFees, 8, currency);

        const activeCards = [
            {
                color: 'bg-gray-800',
                border: 'border-gray-800',
                icon: 'i-[ic-round-lock-clock]',
                title: labels.amount,
                value: activeAmount
            },
            {
                color: 'bg-rose-800',
                border: 'border-rose-800',
                icon: 'i-[fluent-subtract-12-filled]',
                title: labels.estFees,
                value: estimatedFees
            }
        ];

        return activeCards;
    }
    // #endregion

    // #region active_rates
    if (type === 'rates') {
        const { lending = [] } = data;

        const reducedRates = lending.reduce((list, current) => list.push(+current.rate) && list, []);
        const maxRate = lending.reduce((maximum, current) => Math.max(maximum, current.rate), 0) || 0;
        const minRate = lending.reduce((a, b) => Math.min(a, b.rate), maxRate) || 0;

        const bestRate = formatNumber(maxRate * 100, 8, '%');
        const averageRate = formatNumber(averageOfList(reducedRates) * 100, 8, '%');
        const lowestRate = formatNumber(minRate * 100, 8, '%');

        const rateCards = [
            {
                color: 'bg-sky-900',
                border: 'border-sky-900',
                icon: 'i-[ic-round-star]',
                title: labels.best,
                value: bestRate
            },
            {
                color: 'bg-sky-900',
                border: 'border-sky-900',
                icon: 'i-[mdi-tilde]',
                title: labels.average,
                value: averageRate
            },
            {
                color: 'bg-sky-900',
                border: 'border-sky-900',
                icon: 'i-[ic-round-vertical-align-bottom]',
                title: labels.lowest,
                value: lowestRate
            }
        ];

        return rateCards;
    }
    // #endregion

    // #region active_estimated
    if (type === 'estimate') {
        const { currency, lending = [] } = data;

        const estimatedSingle = lending.reduce((sum, current) => sum + current.amount * current.rate, 0);
        const estimatedTotal = lending.reduce((sum, current) => sum + current.amount * current.rate * current.period, 0);
        const reducedPeriods = lending.reduce((list, current) => list.push(current.period) && list, []);

        const estimatedTomorrow = formatNumber(estimatedSingle * (1 - exchangeFees), 8, currency);
        const estimatedEarnings = formatNumber(estimatedTotal * (1 - exchangeFees), 8, currency);
        const averagePeriod = formatNumber(averageOfList(reducedPeriods), 0, 'days');

        const estimateCards = [
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[mdi-tilde]',
                title: labels.earnings,
                value: estimatedEarnings
            },
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[mdi-tilde]',
                title: labels.tomorrow,
                value: estimatedTomorrow
            },
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[mdi-tilde]',
                title: labels.avgPeriod,
                value: averagePeriod
            }
        ];

        return estimateCards;
    }
    // #endregion

    // #region open_offers
    if (type === 'open') {
        const { currency, availableBalance, funding = [] } = data;

        const totalAmount = funding.reduce((sum, current) => sum + current.remaining_amount, 0);

        const availableAmount = formatNumber(availableBalance, 8, currency);
        const openAmount = formatNumber(totalAmount, 8, currency);

        const openCards = [
            {
                color: 'bg-gray-800',
                border: 'border-gray-800',
                icon: 'i-[fluent-text-bullet-list-square-clock-20-filled]',
                title: labels.available,
                value: availableAmount
            },
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[ic-round-lock-clock]',
                title: labels.open,
                value: openAmount
            }
        ];

        return openCards;
    }
    // #endregion

    // #region earnings
    if (type === 'earnings') {
        const {
            currency,
            earningsFull: { averageAmount, totalSum, totalTime }
        } = data;

        const totalFees = formatNumber(totalSum * exchangeFees, 8, currency);
        const totalEarnings = formatNumber(totalSum, 8, currency);
        const averagePerDay = formatNumber(averageAmount, 8, currency);
        const formattedTime = formatNumber(totalTime, 0, 'days');

        const earnCards = [
            {
                color: 'bg-gray-800',
                border: 'border-gray-800',
                icon: 'i-[tabler-pig-money]',
                title: labels.total.earnings,
                value: totalEarnings
            },
            {
                color: 'bg-rose-800',
                border: 'border-rose-800',
                icon: 'i-[fluent-subtract-12-filled]',
                title: labels.total.fees,
                value: totalFees
            },
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[mdi-tilde]',
                title: labels.avgPerDay,
                value: averagePerDay
            },
            {
                color: 'bg-emerald-800',
                border: 'border-emerald-800',
                icon: 'i-[material-symbols-timeline]',
                title: labels.total.time,
                value: formattedTime
            }
        ];

        return earnCards;
    }
    // #endregion

    // #region homepage
    if (type === 'home') {
        const { currency } = data;

        const totalAmount = formatNumber(data.balance, 8, currency);

        const homeCards = [
            {
                color: 'bg-gray-800',
                border: 'border-gray-800',
                icon: 'i-[ic-sharp-account-balance-wallet]',
                title: labels.totalAmount,
                value: totalAmount
            }
        ];

        return homeCards;
    }
    // #endregion

    return [];
};

export default cardsList;
