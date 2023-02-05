// modules
import clsx from 'clsx';
import { TooltipWrapper } from 'react-tooltip';

// types
import { tourButtonTypes } from 'src/types';

const TourButton = ({ text, manualTour }) => (
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
            onClick={manualTour}
        >
            <span className={clsx(['flex', 'items-center', 'justify-center', 'text-lg', 'text-white'])}>
                <div className={clsx(['i-[la-chalkboard-teacher]', 'text-2xl', 'text-white', 'transition-all'])} />
            </span>
            {/* <span className={clsx(['ml-3'])}>{text}</span> */}
        </button>
    </TooltipWrapper>
);

TourButton.propTypes = tourButtonTypes;

export default TourButton;
