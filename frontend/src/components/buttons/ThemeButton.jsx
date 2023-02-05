// modules
import clsx from 'clsx';
import { TooltipWrapper } from 'react-tooltip';

// types
import { themeButtonTypes } from 'src/types';

const ThemeButton = ({ text, theme, handleTheme }) => {
    const themes = {
        light: {
            icon: 'i-[line-md-moon-alt-loop]',
            text: text.dark
        },
        dark: {
            icon: 'i-[line-md-sunny-outline-loop]',
            text: text.light
        }
    };

    return (
        <TooltipWrapper content={themes[theme].text} variant='info' className={clsx(['w-full', 'h-10'])}>
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
                onClick={() => handleTheme(theme === 'light' ? 'dark' : 'light')}
            >
                <span className={clsx(['flex', 'items-center', 'justify-center', 'text-lg', 'text-white'])}>
                    <div className={clsx([themes[theme].icon, 'text-2xl', 'text-white', 'transition-all'])} />
                </span>
                {/* <span className={clsx(['ml-3'])}>{themes[theme].text}</span> */}
            </button>
        </TooltipWrapper>
    );
};

ThemeButton.propTypes = themeButtonTypes;

export default ThemeButton;
