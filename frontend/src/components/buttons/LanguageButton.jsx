// modules
import clsx from 'clsx';
import { TooltipWrapper } from 'react-tooltip';

// types
import { languageButtonTypes } from 'src/types';

const LanguageButton = ({ text, handleModal }) => {
    return (
        <TooltipWrapper content={text} variant='info' className={clsx(['w-full', 'h-10'])}>
            <button
                className={clsx([
                    'w-auto',
                    'h-10',
                    'px-5',
                    'flex',
                    'flex-row',
                    'items-center',
                    'justify-center',
                    'text-white',
                    'duration-300',
                    'hover:bg-sky-800',
                    'dark:hover:bg-sky-900',
                    'transition-all'
                ])}
                onClick={handleModal}
            >
                <span className={clsx(['flex', 'items-center', 'justify-center', 'text-lg', 'text-white'])}>
                    <div
                        className={clsx(['i-[material-symbols-translate-rounded]', 'text-2xl', 'text-white', 'transition-all'])}
                    />
                </span>
                {/* <span className={clsx(['ml-3'])}>{text}</span> */}
            </button>
        </TooltipWrapper>
    );
};

LanguageButton.propTypes = languageButtonTypes;

export default LanguageButton;
