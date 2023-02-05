// modules
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// components
import CustomSpinner from 'src/components/global/CustomSpinner';
import NumberInput from 'src/components/inputs/NumberInput';

// strings
import strings from 'src/strings';

// types
import { simpleStrategyTypes } from 'src/types';

const SimpleStrategy = ({ loading, data, handleChange, onSubmit }) => {
    const { realMinAmount, minAmount, minRate, minPeriod } = data;
    const localize = strings.strategy.simple;

    const formSchema = Yup.object().shape({
        minAmount: Yup.number().required(localize.minAmount.required).min(realMinAmount, localize.minAmount.min),
        minRate: Yup.number().required(localize.minRate.required).min(0.00000001, localize.minRate.min),
        minPeriod: Yup.number()
            .required(localize.minPeriod.required)
            .min(2, localize.minPeriod.min)
            .max(120, localize.minPeriod.max)
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
                placeholder: '0.00000001',
                value: minRate,
                step: '0.00000001',
                min: '0.00000001',
                disabled: loading
            },
            {
                type: 'number',
                name: 'minPeriod',
                label: localize.minPeriod.label,
                info: localize.minPeriod.info,
                placeholder: '2',
                value: minPeriod,
                step: '1',
                min: '2',
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
                    <h2 className={clsx(['mb-4', '-mt-2', 'font-bold', 'text-xl', 'uppercase'])}>{localize.title}</h2>
                    <div className={clsx(['mb-10', 'text-md', 'text-gray-500', 'dark:text-gray-100'])}>
                        {localize.description.map((line, index) => (
                            <p key={`strategy-simple-description-${index}`}>{line}</p>
                        ))}
                    </div>
                    {inputGrid.map((row, rIndex) => (
                        <div
                            key={`strategy-${data.type}_${rIndex}`}
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
                            {row.map((col, cIndex) => (
                                <div key={`strategy-${data.type}_${rIndex}_${cIndex}`}>
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
                </div>
                <div className={clsx(['flex', 'justify-between', 'pt-8'])}>
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

SimpleStrategy.propTypes = simpleStrategyTypes;

export default SimpleStrategy;
