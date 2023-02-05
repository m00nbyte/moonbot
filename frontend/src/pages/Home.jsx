// modules
import clsx from 'clsx';
import Collapsible from 'react-collapsible';
import shallow from 'zustand/shallow';

// functions
import cardsList from 'src/functions/cardsList';

// components
import CardGrid from 'src/components/global/CardGrid';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { homePageTypes } from 'src/types';

const stateSelector = (state) => ({
    home: state.home,
    dispatch: state.dispatch
});

const Home = ({ data }) => {
    const { home, dispatch } = useStore(stateSelector, shallow);

    const localize = strings.home;

    const homeCards = cardsList('home', data);
    const activeCards = cardsList('active', data);
    const estimateCards = cardsList('estimate', data);
    const rateCards = cardsList('rates', data);
    const openCards = cardsList('open', data);
    const earnCards = cardsList('earnings', data);

    const handleCollapse = (block) => {
        const newState = !home[block];
        dispatch({ type: 'home', value: { ...home, [block]: newState } });

        return newState;
    };

    return (
        <>
            <h1 className={clsx(['mt-2', 'mb-3', 'text-3xl', 'font-bold', 'uppercase'])}>{localize.title}</h1>

            <div className={clsx(['flex', 'justify-start'])}>
                <div className={clsx(['w-full', 'flex', 'flex-col', 'space-y-12'])}>
                    <div>
                        <CardGrid data={homeCards} />
                    </div>

                    <Collapsible
                        trigger={
                            <div className={clsx(['flex', 'space-x-1', 'items-center', 'font-semibold'])}>
                                <div
                                    className={clsx([
                                        'i-[material-symbols-keyboard-arrow-down-rounded] text-2xl',
                                        'transition-all',
                                        home.activeCards && 'rotate-180'
                                    ])}
                                />
                                <h2 className={clsx(['text-2xl', 'font-bold', 'uppercase'])}>{localize.sections.active}</h2>
                            </div>
                        }
                        open={home.activeCards}
                        handleTriggerClick={() => handleCollapse('activeCards')}
                        transitionTime={200}
                    >
                        <CardGrid data={activeCards} />
                        <CardGrid data={estimateCards} />
                        <CardGrid data={rateCards} />
                    </Collapsible>

                    <Collapsible
                        trigger={
                            <div className={clsx(['flex', 'space-x-1', 'items-center', 'font-semibold'])}>
                                <div
                                    className={clsx([
                                        'i-[material-symbols-keyboard-arrow-down-rounded] text-2xl',
                                        'transition-all',
                                        home.openCards && 'rotate-180'
                                    ])}
                                />
                                <h2 className={clsx(['text-2xl', 'font-bold', 'uppercase'])}>{localize.sections.open}</h2>
                            </div>
                        }
                        open={home.openCards}
                        handleTriggerClick={() => handleCollapse('openCards')}
                        transitionTime={200}
                    >
                        <CardGrid data={openCards} />
                    </Collapsible>

                    <Collapsible
                        trigger={
                            <div className={clsx(['flex', 'space-x-1', 'items-center', 'font-semibold'])}>
                                <div
                                    className={clsx([
                                        'i-[material-symbols-keyboard-arrow-down-rounded] text-2xl',
                                        'transition-all',
                                        home.earnCards && 'rotate-180'
                                    ])}
                                />
                                <h2 className={clsx(['text-2xl', 'font-bold', 'uppercase'])}>{localize.sections.earnings}</h2>
                            </div>
                        }
                        open={home.earnCards}
                        handleTriggerClick={() => handleCollapse('earnCards')}
                        transitionTime={200}
                    >
                        <CardGrid data={earnCards} />
                    </Collapsible>
                </div>
            </div>
        </>
    );
};

Home.propTypes = homePageTypes;

export default Home;
