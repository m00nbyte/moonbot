// modules
import clsx from 'clsx';
import Switch from 'react-switch';
import Select from 'react-tailwindcss-select';
import { Tooltip, TooltipProvider } from 'react-tooltip';
import { shallow } from 'zustand/shallow';

// components
import StrategyInfos from 'src/components/global/StrategyInfos';
import SimpleStrategy from 'src/components/strategies/Simple';
import EqualStrategy from 'src/components/strategies/Equal';
import PyramidStrategy from 'src/components/strategies/Pyramid';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { strategyPageTypes } from 'src/types';

const API_URL = process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    loading: state.loading,
    currentCoin: state.current,
    theme: state.theme,
    realMinAmount: state.stats.min,
    collapse: state.collapse,
    token: state.auth.token,
    dispatch: state.dispatch
});

const Strategy = ({ data, handleLoading }) => {
    const { loading, currentCoin, realMinAmount, token, dispatch } = useStore(stateSelector, shallow);
    const localize = strings.strategy;

    const updateData = async (data) => {
        try {
            const res = await fetch(`${API_URL}/api/data/strategy`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            return json;
        } catch (error) {
            return { status: false, message: 'failedBackend' };
        }
    };

    const handleStrategy = async (prop) => {
        let current = {
            id: data._id,
            type: 'state',
            prop
        };

        await updateData(current);
    };

    const handleSelect = async (e) => {
        const { value } = e;

        dispatch({ type: 'strategy', value: { ...data, select: value } });
    };

    const handleActive = async (b) => {
        const { active, select } = data;
        const value = active === select ? 'none' : select;

        const props = { select, active: value };

        await handleStrategy(props);

        dispatch({ type: 'strategy', value: { ...data, ...props } });
    };

    const handleRow = (type, map, index) => {
        const maxRows = data.types[type][map].length > 9;

        let newList = [];

        if (index < 0) {
            if (maxRows) {
                dispatch({
                    type: 'toast',
                    value: { type: 'error', value: 'maxOfferMap' }
                });
            } else {
                newList = [type === 'pyramid' ? [0, 0, 0] : [0, 0], ...data.types[type][map]];
            }
        } else {
            data.types[type][map].splice(index, 1);
            newList = data.types[type][map];
        }

        if (newList.length) {
            dispatch({
                type: 'strategy',
                value: {
                    ...data,
                    types: {
                        ...data.types,
                        [type]: { ...data.types[type], [map]: newList }
                    }
                }
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const type = data.select;

        let current = {};

        if (name.startsWith('periodMap_') || name.startsWith('rapMap_')) {
            const index = name.split('_');
            const map = data.types[type][index[0]];
            map[index[1]][index[2]] = +value;

            current[index[0]] = map;
        } else {
            current[name] = +value;
        }

        dispatch({
            type: 'strategy',
            value: { ...data, types: { ...data.types, [type]: { ...data.types[type], ...current } } }
        });
    };

    const onSubmit = async () => {
        handleLoading(true);

        const type = data.select;
        const form = data.types[type];

        let current = {
            id: data._id,
            coin: currentCoin,
            type,
            ...form
        };

        const res = await updateData(current);

        if (res.status) {
            dispatch({
                type: 'strategy',
                value: { ...data, types: { ...data.types, [type]: { ...data.types[type], ...form } } }
            });
            dispatch({
                type: 'toast',
                value: { type: 'success', value: res.message }
            });
        } else {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: res.message }
            });
        }

        handleLoading(false);
    };

    return (
        <>
            <h1 className={clsx(['mt-2', 'mb-3', 'font-bold', 'text-3xl', 'uppercase'])}>{localize.title}</h1>

            <div className={clsx(['mt-3', 'flex', 'justify-start'])}>
                <div className={clsx(['w-full'])}>
                    <div
                        className={clsx([
                            'px-5',
                            'pt-3',
                            'pb-4',
                            'mb-8',
                            'bg-stone-100',
                            'dark:bg-stone-800',
                            'border',
                            'border-stone-300',
                            'dark:border-stone-700'
                        ])}
                    >
                        <div
                            className={clsx([
                                'grid',
                                'md:grid-cols-2',
                                'space-y-4',
                                'md:space-y-0',
                                'md:space-x-2',
                                'items-center'
                            ])}
                        >
                            <div className={clsx(['tour-strategy-select', 'order-2', 'md:order-1'])}>
                                <Select
                                    primaryColor={'emerald'}
                                    isSearchable={Object.keys(data.types).length > 5}
                                    options={Object.keys(data.types).map(
                                        (item) => ({
                                            value: item,
                                            label: localize.select.list[item].label
                                        }),
                                        []
                                    )}
                                    value={{
                                        value: data.select,
                                        label: (
                                            <span className={clsx(['flex', 'flex-row', 'space-x-2', 'items-center'])}>
                                                <span className={clsx([localize.select.list[data.select].icon])} />
                                                <span>{localize.select.list[data.select].label}</span>
                                            </span>
                                        )
                                    }}
                                    formatOptionLabel={(option) => (
                                        <li
                                            className={clsx([
                                                'px-2',
                                                'py-2',
                                                'flex',
                                                'items-center',
                                                'justify-between',
                                                'truncate',
                                                'select-none',
                                                'cursor-pointer',
                                                option.value === data.select
                                                    ? ['text-white', 'bg-emerald-500']
                                                    : ['text-gray-500', 'hover:bg-emerald-100', 'hover:text-emerald-500']
                                            ])}
                                        >
                                            <div className={clsx(['flex', 'flex-row', 'space-x-2', 'items-center'])}>
                                                <div className={clsx([localize.select.list[option.value].icon])} />
                                                <span>{option.label}</span>
                                            </div>
                                            {option.value === data.select && (
                                                <div className={clsx(['i-[material-symbols-check]'])} />
                                            )}
                                        </li>
                                    )}
                                    classNames={{
                                        menuButton: ({ isDisabled }) =>
                                            clsx([
                                                'flex',
                                                'text-sm',
                                                'text-gray-500',
                                                'border',
                                                'border-stone-300',
                                                'shadow-sm',
                                                'cursor-pointer',
                                                isDisabled ? 'bg-gray-200' : 'bg-white'
                                            ]),
                                        menu: clsx([
                                            'w-full',
                                            'py-1',
                                            'mt-1.5',
                                            'z-10',
                                            'absolute',
                                            'text-sm',
                                            'text-gray-700',
                                            'bg-white',
                                            'border',
                                            'shadow-lg'
                                        ])
                                    }}
                                    placeholder={localize.select.placeholder}
                                    onChange={(event) => handleSelect(event)}
                                    disabled={loading}
                                />
                            </div>
                            <div className={clsx(['order-1', 'md:order-2'])}>
                                <div
                                    className={clsx([
                                        'py-1',
                                        'mb-2',
                                        'md:mb-0',
                                        '-mt-5',
                                        'md:mt-0',
                                        'flex',
                                        'items-center',
                                        'justify-center',
                                        'md:justify-end',
                                        'font-semibold',
                                        'text-neutral-900'
                                    ])}
                                >
                                    <div
                                        className={clsx([
                                            'tour-strategy-activate',
                                            'w-auto',
                                            'p-2',
                                            'flex',
                                            'items-center',
                                            'space-x-3',
                                            'text-neutral-900',
                                            'dark:text-white',
                                            'border',
                                            'border-transparent'
                                        ])}
                                    >
                                        <span className={clsx(['font-semibold', 'text-md'])}>
                                            {(data.active === data.select ? localize.active : localize.inactive).toUpperCase()}
                                        </span>
                                        <Switch
                                            id="activeSwitch"
                                            className={clsx(['react-switch'])}
                                            onChange={handleActive}
                                            onColor={'#047857'}
                                            offColor={'#be123c'}
                                            checked={data.active === data.select}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <StrategyInfos />

                    <TooltipProvider>
                        <div className={clsx(['tour-strategy-manage'])}>
                            <Tooltip className={clsx(['text-white', 'dark:text-white', 'dark:bg-sky-900'])} place="top" />

                            {(data.select === 'simple' && (
                                <SimpleStrategy
                                    loading={loading}
                                    data={{ ...data.types[data.select], realMinAmount }}
                                    handleChange={handleChange}
                                    onSubmit={onSubmit}
                                />
                            )) ||
                                (data.select === 'equal' && (
                                    <EqualStrategy
                                        loading={loading}
                                        data={{ ...data.types[data.select], realMinAmount }}
                                        handleChange={handleChange}
                                        handleRow={handleRow}
                                        onSubmit={onSubmit}
                                    />
                                )) ||
                                (data.select === 'pyramid' && (
                                    <PyramidStrategy
                                        loading={loading}
                                        data={{ ...data.types[data.select], realMinAmount }}
                                        handleChange={handleChange}
                                        handleRow={handleRow}
                                        onSubmit={onSubmit}
                                    />
                                ))}
                        </div>
                    </TooltipProvider>
                </div>
            </div>
        </>
    );
};

Strategy.propTypes = strategyPageTypes;

export default Strategy;
