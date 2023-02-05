// modules
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// strings
import strings from 'src/strings';

const NoPage = () => {
    const navigate = useNavigate();

    const localize = strings.error;

    return (
        <main className={clsx(['w-full', 'h-screen', 'flex', 'flex-col', 'justify-center', 'items-center', 'bg-sky-900'])}>
            <h1
                className={clsx([
                    'font-extrabold',
                    'text-8xl',
                    'md:text-9xl',
                    'text-white',
                    'tracking-widest',
                    'cursor-default',
                    'select-none'
                ])}
            >
                {localize.title}
            </h1>
            <div
                className={clsx([
                    'px-2',
                    'absolute',
                    'rotate-12',
                    'text-sm',
                    'text-white',
                    'bg-neutral-900',
                    'cursor-default',
                    'select-none'
                ])}
            >
                {localize.tagline}
            </div>
            <div className={clsx(['mt-5'])}>
                <button
                    className={clsx([
                        'w-full',
                        'px-5',
                        'py-2',
                        'font-bold',
                        'text-md',
                        'text-white',
                        'bg-emerald-600',
                        'hover:bg-emerald-700',
                        'dark:bg-emerald-700',
                        'dark:hover:bg-emerald-800',
                        'transition-all'
                    ])}
                    onClick={() => navigate('/')}
                >
                    {localize.button}
                </button>
            </div>
        </main>
    );
};

export default NoPage;
