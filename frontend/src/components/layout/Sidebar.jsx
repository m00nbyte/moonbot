// modules
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { useTour } from '@reactour/tour';
import Select from 'react-tailwindcss-select';
import { Tooltip, TooltipProvider } from 'react-tooltip';
import { shallow } from 'zustand/shallow';

// components
import LogoButton from 'src/components/buttons/LogoButton';
import LogoutButton from 'src/components/buttons/LogoutButton';
import ThemeButton from 'src/components/buttons/ThemeButton';
import LanguageButton from 'src/components/buttons/LanguageButton';
import TourButton from 'src/components/buttons/TourButton';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { sidebarTypes } from 'src/types';

const stateSelector = (state) => ({
    tour: state.tour
});

const Sidebar = ({
    sidebarRef,
    location,
    items,
    coins,
    current,
    theme,
    manualTour,
    handleTheme,
    handleModal,
    handleCurrent,
    handleLogout
}) => {
    const { tour } = useStore(stateSelector, shallow);
    const { setIsOpen } = useTour();

    const localize = strings.sidebar;
    const strategy = strings.strategy;

    useEffect(() => {
        setIsOpen(tour.active);
    }, [setIsOpen, tour.active]);

    return (
        <aside
            ref={sidebarRef}
            className={clsx([
                'w-64',
                'h-full',
                'fixed',
                'z-20',
                'sidebar',
                'bg-sky-900',
                'dark:bg-[#093954]',
                'select-none',
                'md:shadow',
                'transform',
                '-translate-x-full',
                'md:translate-x-0',
                'transition-all',
                'duration-150',
                'ease-in'
            ])}
        >
            <div className={clsx(['sidebar-header', 'py-4', 'pl-3', 'flex', 'items-center', 'justify-start'])}>
                <LogoButton text={localize.logo} to={'/'} />
            </div>
            <div className={clsx(['tour-coins-select', 'mx-2', 'mt-1'])}>
                <Select
                    primaryColor={'sky'}
                    isSearchable={coins.length > 5}
                    options={coins.map((item) => ({ value: item, label: item }), [])}
                    value={
                        current && {
                            value: current,
                            label: current
                        }
                    }
                    formatOptionLabel={(data) => (
                        <li
                            className={clsx([
                                'px-2',
                                'py-2',
                                'flex',
                                'items-center',
                                'justify-between',
                                'truncate',
                                'select-none',
                                'cursor-pointer',
                                'transition',
                                'duration-200',
                                data.label === current
                                    ? ['text-white', 'bg-sky-600', 'dark:bg-sky-700']
                                    : ['text-gray-500', 'hover:text-sky-600', 'dark:hover:text-sky-700', 'hover:bg-neutral-200']
                            ])}
                        >
                            <div className={clsx(['flex', 'flex-row', 'space-x-2', 'items-center'])}>
                                <span>{data.label}</span>
                            </div>
                            {data.label === current && <div className={clsx(['i-[material-symbols-check]'])} />}
                        </li>
                    )}
                    classNames={{
                        menuButton: ({ isDisabled }) =>
                            clsx([
                                'flex',
                                'text-sm',
                                'text-gray-500',
                                'border',
                                'border-stone-300',
                                'shadow-sm',
                                'cursor-pointer',
                                isDisabled ? 'bg-gray-200' : 'bg-white'
                            ]),
                        menu: clsx([
                            'w-full',
                            'py-1',
                            'mt-1.5',
                            'absolute',
                            'z-10',
                            'text-sm',
                            'text-gray-700',
                            'bg-white',
                            'border',
                            'shadow-lg'
                        ])
                    }}
                    placeholder={localize.select}
                    onChange={(event) => handleCurrent(event)}
                />
            </div>
            <div className={clsx(['sidebar-content', 'py-6'])}>
                <ul className={clsx(['w-full', 'flex', 'flex-col'])}>
                    {items.map(({ icon, name, to, badge }) => (
                        <li key={`sidebar-item-${name}`} className={clsx(['my-px'])}>
                            <Link
                                to={to}
                                className={clsx([
                                    'w-full',
                                    'h-10',
                                    'px-3',
                                    'flex',
                                    'flex-row',
                                    'items-center',
                                    'text-white',
                                    'transition-all',
                                    'duration-300',
                                    (location.pathname === to && ['bg-sky-700', 'dark:bg-sky-800']) || [
                                        'hover:bg-sky-800',
                                        'dark:hover:bg-sky-900'
                                    ]
                                ])}
                            >
                                <span className={clsx(['flex', 'items-center', 'justify-center', 'text-lg', 'text-white'])}>
                                    <div className={clsx(['text-2xl', 'text-white', icon])} />
                                </span>
                                <span className={clsx(['ml-3'])}>{name}</span>
                                {badge && (
                                    <span
                                        className={clsx([
                                            'h-6',
                                            'px-2',
                                            'ml-auto',
                                            'flex',
                                            'items-center',
                                            'justify-center',
                                            'font-mono',
                                            'text-xs',
                                            'font-semibold',
                                            'text-white',
                                            'transition-all',
                                            (location.pathname === to && ['bg-sky-600', 'dark:bg-sky-700']) || [
                                                'bg-sky-700',
                                                'dark:bg-sky-800',
                                                'dark:hover:bg-sky-700'
                                            ]
                                        ])}
                                    >
                                        {['strategy', 'strategie'].includes(name.toLowerCase()) && (
                                            <div
                                                className={clsx([
                                                    (badge === 'none' && 'i-[ic-sharp-cancel]') ||
                                                        strategy.select.list[badge].icon
                                                ])}
                                            />
                                        )}
                                        {['offers', 'angebote'].includes(name.toLowerCase()) && badge.open + badge.active}
                                        {['earnings', 'einnahmen'].includes(name.toLowerCase()) && badge.sum}
                                    </span>
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={clsx(['w-full', 'my-px', 'absolute', 'bottom-0', 'flex', 'flex-row'])}>
                <TooltipProvider>
                    <Tooltip className={clsx(['text-white', 'dark:text-white', 'dark:bg-sky-900'])} place="top" />

                    <TourButton text={localize.tour} manualTour={manualTour} />
                    <ThemeButton text={localize.theme} theme={theme} handleTheme={handleTheme} />
                    <LanguageButton text={localize.language} handleModal={handleModal} />
                    <LogoutButton text={localize.logout} handleLogout={handleLogout} />
                </TooltipProvider>
            </div>
        </aside>
    );
};

Sidebar.propTypes = sidebarTypes;

export default Sidebar;
