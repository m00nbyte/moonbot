// modules
import clsx from 'clsx';
import { TooltipWrapper } from 'react-tooltip';

// types
import { inputWrapperTypes } from 'src/types';

const InputWrapper = ({ name, info, label, mobileLabel, errors, children }) => {
    return (
        <>
            {label && (
                <label
                    htmlFor={name}
                    className={clsx([
                        'pb-1',
                        'ml-1',
                        'md:ml-0',
                        'space-x-2',
                        'items-center',
                        'justify-between',
                        'text-neutral-900',
                        'dark:text-white',
                        'uppercase',
                        mobileLabel ? ['flex', 'md:hidden'] : 'flex'
                    ])}
                >
                    <span>{label}</span>
                    {info && (
                        <TooltipWrapper content={info} variant='info'>
                            <div className={clsx(['i-[material-symbols-info-rounded]', 'text-lg ', 'cursor-pointer'])} />
                        </TooltipWrapper>
                    )}
                </label>
            )}
            {children}
            {errors[name] && (
                <span className={clsx(['mb-2', 'flex', 'font-bold', 'text-sm', 'text-rose-700', 'dark:text-rose-600'])}>
                    {errors[name].message || 'required'}
                </span>
            )}
        </>
    );
};

InputWrapper.propTypes = inputWrapperTypes;

export default InputWrapper;
