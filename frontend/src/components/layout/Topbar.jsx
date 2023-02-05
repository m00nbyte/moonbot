// modules
import clsx from 'clsx';

// components
import LogoButton from 'src/components/buttons/LogoButton';

// strings
import strings from 'src/strings';

// types
import { topbarTypes } from 'src/types';

const Topbar = ({ hamburgerRef, sidebarRef }) => {
    const localize = strings.sidebar;

    return (
        <header
            className={clsx([
                'header',
                'px-4',
                'py-4',
                'z-10',
                'md:hidden',
                'bg-sky-900',
                'dark:bg-[#093954]',
                'shadow',
                'select-none'
            ])}
        >
            <div className={clsx(['header-content', 'flex', 'flex-row', 'items-center'])}>
                <LogoButton text={localize.logo} to={'/'} />

                <div className={clsx(['ml-auto', 'flex'])}>
                    <div
                        ref={hamburgerRef}
                        className={clsx(['tham', 'tham-e-squeeze', 'tham-w-6'])}
                        onClick={() => {
                            const toggleElement = hamburgerRef.current;
                            toggleElement.classList.toggle('tham-active');

                            const sideElement = sidebarRef.current;
                            sideElement.classList.toggle('-translate-x-full');
                        }}
                    >
                        <div className={clsx(['tham-box'])}>
                            <div className={clsx(['bg-white', 'tham-inner'])} />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

Topbar.propTypes = topbarTypes;

export default Topbar;
