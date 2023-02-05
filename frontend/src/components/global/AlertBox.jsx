// modules
import clsx from 'clsx';

// types
import { alertBoxTypes } from 'src/types';

const alertStyles = {
    simple: {
        box: [
            'text-stone-800',
            'dark:text-white',
            'bg-gray-200',
            'dark:bg-stone-900',
            'border',
            'border-stone-300',
            'dark:border-stone-700'
        ],
        icon: ['text-stone-800', 'dark:text-white'],
        link: ['text-neutral-900', 'dark:text-stone-100', 'hover:text-stone-500', 'dark:hover:text-stone-300']
    },
    info: {
        box: [
            'text-sky-800',
            'dark:text-white',
            'bg-sky-200',
            'dark:bg-sky-800',
            'border',
            'border-sky-300',
            'dark:border-sky-700'
        ],
        icon: ['text-sky-800', 'dark:text-white'],
        link: ['text-neutral-900', 'dark:text-stone-100', 'hover:text-stone-500', 'dark:hover:text-stone-300']
    },
    success: {
        box: [
            'text-emerald-800',
            'dark:text-white',
            'bg-emerald-200',
            'dark:bg-emerald-800',
            'border',
            'border-emerald-300',
            'dark:border-emerald-700'
        ],
        icon: ['text-emerald-800', 'dark:text-white'],
        link: ['text-neutral-900', 'dark:text-stone-100', 'hover:text-stone-500', 'dark:hover:text-stone-300']
    },
    error: {
        box: [
            'text-rose-800',
            'dark:text-white',
            'bg-rose-200',
            'dark:bg-rose-800',
            'border',
            'border-rose-300',
            'dark:border-rose-700'
        ],
        icon: ['text-rose-800', 'dark:text-white'],
        link: ['text-neutral-900', 'dark:text-stone-100', 'hover:text-stone-500', 'dark:hover:text-stone-300']
    }
};

const AlertBox = ({ type, icon, title, text, link }) => {
    return (
        <div
            className={clsx([
                'px-5',
                'py-3',
                'mt-1',
                'mb-4',
                'flex',
                'flex-col',
                'md:flex-row',
                'items-center',
                'md:space-x-4',
                'text-md',
                alertStyles[type].box
            ])}
            role='alert'
        >
            {icon && <div className={clsx([icon, 'hidden', 'md:block', 'text-2xl', alertStyles[type].icon])} />}
            <div className={clsx(['md:w-full', 'flex', 'items-center', 'justify-between'])}>
                <div className={clsx(['flex', 'flex-col', 'text-center', 'md:text-left'])}>
                    {title && <span className={clsx(['font-bold'])}>{title}</span>}
                    {text && (
                        <div
                            className={clsx([
                                'flex',
                                'flex-row',
                                'space-x-1',
                                'items-baseline',
                                'font-medium',
                                'justify-center',
                                'md:justify-start'
                            ])}
                        >
                            {text}
                        </div>
                    )}
                </div>
            </div>
            {link && (
                <a
                    className={clsx([
                        'mt-2',
                        'md:mt-0',
                        'md:flex',
                        'flex-col',
                        'items-center',
                        'justify-center',
                        alertStyles[type].link
                    ])}
                    href={link}
                    target='_blank'
                    rel='noreferrer'
                >
                    <div className={clsx(['i-[ci-external-link]', 'text-2xl'])} />
                </a>
            )}
        </div>
    );
};

AlertBox.propTypes = alertBoxTypes;

export default AlertBox;
