// modules
import { memo } from 'react';
import { renderToString } from 'react-dom/server';
import clsx from 'clsx';
import moment from 'moment';
import Collapsible from 'react-collapsible';
import { shallow } from 'zustand/shallow';

// functions
import formatNumber from 'src/functions/formatNumber';

// components
import LineChart from 'src/components/charts/LineChart';
import AlertBox from 'src/components/global/AlertBox';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

const stateSelector = (state) => ({
    theme: state.theme,
    currentCoin: state.current,
    stats: state.stats,
    collapse: state.collapse,
    dispatch: state.dispatch
});

const StrategyInfos = memo(() => {
    const { theme, currentCoin, stats, collapse, dispatch } = useStore(stateSelector, shallow);
    const localize = strings.strategy.info;

    const handleCollapse = () => {
        dispatch({ type: 'collapse', value: !collapse });
        return !collapse;
    };

    const customTooltip = (value, { series, seriesIndex, dataPointIndex, w }) => {
        const reversedData = stats.history[stats.history.length - dataPointIndex];

        return renderToString(
            <div className={clsx(['font-light'])}>
                <div className={clsx(['flex', 'space-x-2', 'justify-center'])}>
                    <span className={clsx(['font-bold'])}>{moment(reversedData[0]).format('DD/MM/YYYY hh:mm:ss')} UTC</span>
                </div>
                <br />
                <div className={clsx(['flex', 'space-x-2', 'justify-between'])}>
                    <span>{localize.tooltip.fundingProvided}:</span>
                    <span className={clsx(['font-bold'])}>{formatNumber(reversedData[7])}</span>
                </div>
                <div className={clsx(['flex', 'space-x-2', 'justify-between'])}>
                    <span>{localize.tooltip.fundingUsed}:</span>
                    <span className={clsx(['font-bold'])}>{formatNumber(reversedData[8])}</span>
                </div>
                <br />
                <div className={clsx(['flex', 'space-x-2', 'justify-between'])}>
                    <span>{localize.tooltip.averagePeriod}:</span>
                    <span className={clsx(['font-bold'])}>{reversedData[4]} days</span>
                </div>
                <div className={clsx(['flex', 'space-x-2', 'justify-between'])}>
                    <span>{localize.tooltip.frr}:</span>
                    <span className={clsx(['font-bold'])}>{value.toFixed(4)}%</span>
                </div>
            </div>
        );
    };

    return (
        <div
            className={clsx([
                'tour-strategy-info',
                'p-4',
                'mt-8',
                'mb-8',
                'bg-stone-100',
                'dark:bg-stone-800',
                'border',
                'border-stone-300',
                'dark:border-stone-700'
            ])}
        >
            <AlertBox
                type={'info'}
                icon={'i-[mdi-bell-notification-outline]'}
                title={localize.note}
                text={
                    <>
                        <span className={clsx(['tracking-wide'])}>{`${stats.min.toFixed(2)} ${currentCoin}`}</span>
                        <small className={clsx(['font-thin'])}>~ 150 USD</small>
                    </>
                }
                link={'https://support.bitfinex.com/hc/en-us/articles/213918949-What-is-the-minimum-offer-for-Funding'}
            />

            <Collapsible
                trigger={
                    <div className={clsx(['flex', 'space-x-1', 'items-center', 'font-semibold'])}>
                        <div
                            className={clsx([
                                'i-[material-symbols-keyboard-arrow-down-rounded] text-2xl',
                                'transition-all',
                                collapse && 'rotate-180'
                            ])}
                        />
                        <span className={clsx(['uppercase'])}>
                            {strings.formatString(localize.toggle.text, {
                                toggle: !collapse ? localize.toggle.show : localize.toggle.hide
                            })}
                        </span>
                    </div>
                }
                open={collapse}
                handleTriggerClick={handleCollapse}
                transitionTime={200}
            >
                <LineChart
                    theme={theme}
                    title="funding-stats"
                    labels={stats.history.map((item) => moment(item[0]).format('DD/MM/YYYY'), []).reverse()}
                    data={stats.history.map((item) => item[3] * 365 * 100, []).reverse()}
                    customTooltip={customTooltip}
                />
            </Collapsible>
        </div>
    );
});

export default StrategyInfos;
