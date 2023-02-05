// modules
import clsx from 'clsx';

// types
import { loadingPageTypes } from 'src/types';

const LoadingPage = ({ loading }) => {
    return (
        <div
            id='loading-screen'
            className={clsx([
                'w-full',
                'h-full',
                'top-0',
                'left-0',
                'fixed',
                'flex',
                'items-center',
                'justify-center',
                'bg-white',
                'dark:bg-stone-800',
                'transition-all',
                'duration-300',
                (!loading && 'opacity-0') || 'z-50'
            ])}
        >
            <div
                className={clsx([
                    'i-[eos-icons-three-dots-loading]',
                    'text-[6rem]',
                    'text-stone-800',
                    'dark:text-white',
                    'transition-all'
                ])}
            />
        </div>
    );
};

LoadingPage.propTypes = loadingPageTypes;

export default LoadingPage;
