// modules
import clsx from 'clsx';

const Footer = () => {
    return (
        <footer className={clsx(['footer', 'px-4', 'py-6', 'mt-auto mx-auto absolute bottom-0'])}>
            <div className={clsx(['footer-content'])}>
                <p
                    className={clsx([
                        'flex',
                        'flex-row',
                        'space-x-2',
                        'items-center',
                        'justify-center',
                        'text-sm',
                        'text-center',
                        'text-stone-500',
                        'dark:text-stone-400'
                    ])}
                >
                    <a
                        href='/terms'
                        className={clsx(['hover:text-stone-400', 'dark:hover:text-stone-500', 'underline', 'transition-all'])}
                    >
                        Terms
                    </a>
                    <a
                        href='/privacy'
                        className={clsx(['hover:text-stone-400', 'dark:hover:text-stone-500', 'underline', 'transition-all'])}
                    >
                        Privacy
                    </a>
                    <a
                        href='/legal'
                        className={clsx(['hover:text-stone-400', 'dark:hover:text-stone-500', 'underline', 'transition-all'])}
                    >
                        Legal
                    </a>
                </p>
                <p
                    className={clsx([
                        'flex',
                        'flex-row',
                        'space-x-1',
                        'items-center',
                        'justify-center',
                        'text-sm',
                        'text-center',
                        'text-stone-400',
                        'dark:text-stone-500'
                    ])}
                >
                    <span>made by</span>
                    <a
                        href='https://moonbyte.at/'
                        className={clsx(['hover:text-stone-500', 'dark:hover:text-stone-400', 'underline', 'transition-all'])}
                    >
                        m00nbyte
                    </a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
