// modules
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

// strings
import strings from 'src/strings';

const Terms = () => {
    const navigate = useNavigate();

    const localize = strings.terms;

    return (
        <div className={clsx(['min-h-screen', 'flex', 'flex-col', 'bg-stone-200', 'dark:bg-stone-900', 'font-body'])}>
            <button
                id='backToMenu'
                className={clsx([
                    'p-3',
                    'top-6',
                    'left-6',
                    'fixed',
                    'z-10',
                    'bg-neutral-600',
                    'dark:bg-neutral-700',
                    'hover:bg-neutral-700 ',
                    'dark:hover:bg-neutral-800',
                    'transition-all',
                    'rounded-full'
                ])}
                title='Back'
                onClick={() => navigate(-1)}
            >
                <div className={clsx(['i-[akar-icons-arrow-back-thick-fill] text-white'])} />
            </button>

            <div className={clsx(['max-w-3xl', 'px-8', 'md:px-0', 'mt-4', 'mb-8', 'grid', 'grid-cols-1', 'mx-auto'])}>
                <h1
                    className={clsx([
                        'mt-8',
                        'font-bold',
                        'text-3xl',
                        'text-center',
                        'text-stone-900',
                        'dark:text-white',
                        'uppercase'
                    ])}
                >
                    {localize.title}
                </h1>
                <h2 className={clsx(['mb-6', 'text-md', 'text-center', 'text-stone-900', 'dark:text-stone-100'])}>
                    {localize.tagline}
                </h2>
                {localize.list.map((item, index) => (
                    <div key={`terms-paragraph-${index}`} className={clsx(['mt-4', 'mb-4', 'flex', 'flex-col', 'space-y-2'])}>
                        <h3 className={clsx(['font-bold', 'text-stone-900', 'dark:text-white', 'text-xl', 'uppercase'])}>
                            {item.title}
                        </h3>
                        {item.text.map((block) => (
                            <p className={clsx(['pb-4', 'text-lg', 'text-stone-900', 'dark:text-stone-100', 'text-justify'])}>
                                {block}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Terms;
