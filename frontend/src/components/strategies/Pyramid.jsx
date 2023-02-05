// modules
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { TooltipWrapper } from 'react-tooltip';

// components
import AlertBox from 'src/components/global/AlertBox';
import CustomSpinner from 'src/components/global/CustomSpinner';
import NumberInput from 'src/components/inputs/NumberInput';

// strings
import strings from 'src/strings';

// types
import { pyramidStrategyTypes } from 'src/types';

const PyramidStrategy = ({ loading, data, handleChange, handleRow, onSubmit }) => {
    const { realMinAmount, minAmount, minRate, lowBoundRate, upBoundRate, growExponential, skipRemaining, overAmount, rapMap } =
        data;
    const localize = strings.strategy.pyramid;
    const tableColumns = localize.rapMap.columns;

    const formSchema = Yup.object().shape({
        minAmount: Yup.number().required(localize.minAmount.required).min(realMinAmount, localize.minAmount.min),
        minRate: Yup.number().required(localize.minRate.required).min(0.00000001, localize.minRate.min),
        lowBoundRate: Yup.number().required(localize.lowBoundRate.required).min(0.00000001, localize.lowBoundRate.min),
        upBoundRate: Yup.number().required(localize.upBoundRate.required).min(0.00000002, localize.upBoundRate.min),
        growExponential: Yup.number().required(localize.growExponential.required).min(1, localize.growExponential.min),
        overAmount: Yup.number().required(localize.overAmount.required).min(0, localize.overAmount.min),
        skipRemaining: Yup.number().required(localize.skipRemaining.required).min(0, localize.skipRemaining.min),
        ...rapMap
            .map(
                (row, index) => ({
                    [`rapMap_${index}_0`]: Yup.number().required(localize.rapMap.required).min(0.00000001, localize.rapMap.min),
                    [`rapMap_${index}_1`]: Yup.number().required(localize.rapMap.required).min(0.00000001, localize.rapMap.min),
                    [`rapMap_${index}_2`]: Yup.number()
                        .required(localize.rapMap.required)
                        .min(2, localize.rapMap.min)
                        .max(120, localize.rapMap.max)
                }),
                []
            )
            .reduce(
                (obj, item) => ({
                    ...obj,
                    ...item
                }),
                {}
            )
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    const inputGrid = [
        [
            {
                type: 'number',
                name: 'minAmount',
                label: localize.minAmount.label,
                info: localize.minAmount.info,
                placeholder: realMinAmount,
                value: minAmount,
                step: '0.00000001',
                min: realMinAmount,
                disabled: loading
            },
            {
                type: 'number',
                name: 'minRate',
                label: localize.minRate.label,
                info: localize.minRate.info,
                placeholder: '0.0003',
                value: minRate,
                step: '0.00000001',
                min: '0.00000001',
                disabled: loading
            }
        ],
        [
            {
                type: 'number',
                name: 'lowBoundRate',
                label: localize.lowBoundRate.label,
                info: localize.lowBoundRate.info,
                placeholder: '0.0003',
                value: lowBoundRate,
                step: '0.00000001',
                min: '0.00000001',
                disabled: loading
            },
            {
                type: 'number',
                name: 'upBoundRate',
                label: localize.upBoundRate.label,
                info: localize.upBoundRate.info,
                placeholder: '0.0008',
                value: upBoundRate,
                step: '0.00000001',
                min: '0.00000002',
                disabled: loading
            }
        ],
        [
            {
                type: 'number',
                name: 'growExponential',
                label: localize.growExponential.label,
                info: localize.growExponential.info,
                placeholder: '1.3',
                value: growExponential,
                step: '0.1',
                min: '1.0',
                disabled: loading
            },
            {
                type: 'number',
                name: 'overAmount',
                label: localize.overAmount.label,
                info: localize.overAmount.info,
                placeholder: '1000',
                value: overAmount,
                step: '0.00000001',
                min: '0',
                disabled: loading
            }
        ],
        [
            {
                type: 'number',
                name: 'skipRemaining',
                label: localize.skipRemaining.label,
                info: localize.skipRemaining.info,
                placeholder: '2',
                value: skipRemaining,
                step: '1',
                min: '0',
                disabled: loading
            }
        ]
    ];

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div
                    className={clsx([
                        'px-5',
                        'pt-5',
                        'pb-0',
                        'bg-stone-100',
                        'dark:bg-stone-800',
                        'border',
                        'border-stone-300',
                        'dark:border-stone-700'
                    ])}
                >
                    <h2 className={clsx(['-mt-2', 'mb-4', 'font-bold', 'text-xl', 'uppercase'])}>{localize.title}</h2>
                    <div className={clsx(['mb-10', 'text-md', 'text-gray-500', 'dark:text-gray-100'])}>
                        {localize.description.map((line, index) => (
                            <p key={`strategy-pyramid-description-${index}`}>{line}</p>
                        ))}
                    </div>
                    {inputGrid.map((row, rowIndex) => (
                        <div
                            key={`strategy-${data.type}_${rowIndex}`}
                            className={clsx([
                                'mb-4',
                                'grid',
                                'space-y-4',
                                'md:space-y-0',
                                'md:space-x-4',
                                (row.length % 3 === 0 && 'md:grid-cols-3') ||
                                    (row.length % 2 === 0 && 'md:grid-cols-2') ||
                                    (row.length === 1 && 'md:grid-cols-2') ||
                                    'md:grid-cols-2'
                            ])}
                        >
                            {row.map((col, colIndex) => (
                                <div key={`strategy-${data.type}_${rowIndex}_${colIndex}`}>
                                    <NumberInput
                                        options={col}
                                        register={register}
                                        errors={errors}
                                        handleChange={handleChange}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                    <div
                        className={clsx([
                            'pt-8',
                            'mb-0',
                            'grid',
                            'md:grid-cols-1',
                            'space-y-4',
                            'md:space-y-0',
                            'md:space-x-2'
                        ])}
                    >
                        <div>
                            <label
                                className={clsx([
                                    'pb-1',
                                    'ml-1',
                                    'mb-2',
                                    'md:ml-0',
                                    'flex',
                                    'space-x-2',
                                    'items-center',
                                    'justify-between',
                                    'font-semibold ',
                                    'text-neutral-900',
                                    'dark:text-white'
                                ])}
                            >
                                <span className={clsx(['uppercase'])}>{localize.rapMap.label}</span>
                                <TooltipWrapper content={localize.rapMap.info} variant='info'>
                                    <div
                                        className={clsx(['i-[material-symbols-info-rounded]', 'text-lg ', 'cursor-pointer'])}
                                    />
                                </TooltipWrapper>
                            </label>

                            <AlertBox
                                type={'simple'}
                                icon={'i-[material-symbols-info-outline-rounded]'}
                                text={localize.rapMap.sort}
                            />

                            <div className={clsx(['mt-3', 'mb-4'])}>
                                <button
                                    type='button'
                                    className={clsx([
                                        'w-full',
                                        'px-5',
                                        'py-3',
                                        'font-bold',
                                        'text-md',
                                        'text-white',
                                        'bg-sky-600',
                                        'hover:bg-sky-700',
                                        'dark:bg-sky-700',
                                        'dark:hover:bg-sky-800',
                                        'transition-all'
                                    ])}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleRow('pyramid', 'rapMap', -1);
                                    }}
                                >
                                    {localize.rapMap.add}
                                </button>
                            </div>

                            <div className={clsx(['pt-1', 'mt-3', 'flex', 'flex-col'])}>
                                <div
                                    className={clsx([
                                        'hidden',
                                        'md:grid',
                                        'grid-cols-1',
                                        'md:grid-cols-3',
                                        'gap-x-4',
                                        'gap-y-2'
                                    ])}
                                >
                                    {tableColumns.map((item, cIndex) => (
                                        <div
                                            key={`strategy-pyramid-table-heading-${cIndex}`}
                                            className={clsx([
                                                'pb-1',
                                                'ml-1',
                                                'md:ml-0',
                                                'flex',
                                                'space-x-2',
                                                'items-center',
                                                'justify-between',
                                                'font-semibold ',
                                                'text-neutral-900',
                                                'dark:text-white'
                                            ])}
                                        >
                                            <span className={clsx(['uppercase'])}>{item.title}</span>
                                            <TooltipWrapper content={tableColumns[cIndex].info} variant='info'>
                                                <div
                                                    className={clsx([
                                                        'i-[material-symbols-info-rounded]',
                                                        'text-lg ',
                                                        'cursor-pointer'
                                                    ])}
                                                />
                                            </TooltipWrapper>
                                        </div>
                                    ))}
                                </div>
                                {rapMap.map((row, rIndex) => (
                                    <div
                                        key={`mapWrap-${rIndex}`}
                                        className={clsx([
                                            'p-1',
                                            'mb-3',
                                            'grid',
                                            'grid-cols-1',
                                            'md:grid-cols-3',
                                            'gap-2',
                                            'bg-stone-400',
                                            'dark:bg-stone-600',
                                            'bg-opacity-20'
                                        ])}
                                    >
                                        {row.map((col, cIndex) => (
                                            <div key={`itemWrap-${rIndex}-${cIndex}`}>
                                                <NumberInput
                                                    options={{
                                                        type: 'number',
                                                        name: `rapMap_${rIndex}_${cIndex}`,
                                                        info: null,
                                                        label: tableColumns[cIndex].title,
                                                        mobileLabel: true,
                                                        placeholder:
                                                            (cIndex === 0 && '0.00000001') ||
                                                            (cIndex === 1 && '0.00000001') ||
                                                            (cIndex === 2 && '2'),
                                                        value: col,
                                                        step: cIndex < row.length - 1 ? '0.00000001' : '1',
                                                        min: cIndex < row.length - 1 ? '0.00000001' : '2',
                                                        disabled: loading
                                                    }}
                                                    register={register}
                                                    errors={errors}
                                                    handleChange={handleChange}
                                                />
                                            </div>
                                        ))}
                                        <div className={clsx(['md:-mt-2', 'md:col-span-3'])}>
                                            <button
                                                type='button'
                                                className={clsx([
                                                    'w-full',
                                                    'px-3',
                                                    'py-1',
                                                    'inline-flex',
                                                    'items-center',
                                                    'justify-center',
                                                    'text-sm',
                                                    'text-stone-800',
                                                    'hover:text-white',
                                                    'dark:text-white',
                                                    // 'bg-rose-500',
                                                    // 'dark:bg-rose-700',
                                                    'hover:bg-rose-600',
                                                    'dark:hover:bg-rose-800',
                                                    'opacity-80',
                                                    'hover:opacity-100',
                                                    'transition-all'
                                                ])}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handleRow('pyramid', 'rapMap', rIndex);
                                                }}
                                            >
                                                {localize.rapMap.remove}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={clsx(['pt-8', 'flex', 'justify-between'])}>
                    <button
                        type='submit'
                        className={clsx([
                            'w-full',
                            'px-5',
                            'py-3',
                            '-mt-2',
                            'inline-flex',
                            'items-center',
                            'justify-center',
                            'font-bold',
                            'text-md',
                            'text-white',
                            'bg-emerald-600',
                            'hover:bg-emerald-700',
                            'dark:bg-emerald-700',
                            'dark:hover:bg-emerald-800',
                            'transition-all'
                        ])}
                        disabled={loading}
                    >
                        {loading ? <CustomSpinner size={6} color={'text-white'} /> : localize.save}
                    </button>
                </div>
            </form>
        </>
    );
};

PyramidStrategy.propTypes = pyramidStrategyTypes;

export default PyramidStrategy;
