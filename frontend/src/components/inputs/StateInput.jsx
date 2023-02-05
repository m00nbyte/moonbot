// modules
import clsx from 'clsx';

// components
import InputWrapper from 'src/components/inputs/InputWrapper';

// types
import { stateInputTypes } from 'src/types';

const StateInput = ({ options, register, errors, handleChange }) => {
    const { type, name, label, info, placeholder, value, disabled, autocomplete, autofocus, validation } = options;

    return (
        <InputWrapper name={name} label={label} info={info} errors={errors}>
            <input
                id={name}
                name={name}
                className={clsx([
                    'w-full',
                    'px-3',
                    'py-2',
                    'mb-2',
                    'text-neutral-900',
                    'dark:text-white',
                    'bg-stone-100',
                    'dark:bg-stone-700',
                    'border',
                    'border-stone-200',
                    'dark:border-stone-900',
                    'focus:outline-none',
                    'focus:bg-stone-200',
                    'focus:bg-opacity-30',
                    'focus:border-gray-100',
                    'focus:border-opacity-10',
                    'focus:ring-1',
                    'focus:ring-gray-300',
                    'dark:focus:bg-stone-600',
                    'dark:focus:outline-none',
                    'dark:focus:border-stone-800',
                    'dark:focus:border-opacity-10',
                    'dark:focus:ring-1',
                    'dark:focus:ring-stone-800',
                    'disabled:bg-stone-100',
                    'disabled:text-stone-400',
                    'disabled:border-stone-200',
                    'disabled:shadow-none',
                    'dark:disabled:bg-stone-600',
                    'dark:disabled:text-stone-400',
                    'dark:disabled:border-gray-800',
                    'dark:disabled:shadow-none'
                ])}
                type={type}
                placeholder={placeholder}
                value={value}
                autoComplete={autocomplete ? 'autocomplete' : 'off'}
                autoFocus={autofocus || false}
                disabled={disabled}
                {...register(name, validation)}
                onChange={handleChange}
            />
        </InputWrapper>
    );
};

StateInput.propTypes = stateInputTypes;

export default StateInput;
