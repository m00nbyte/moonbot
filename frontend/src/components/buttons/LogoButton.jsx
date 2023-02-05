// modules
import { Link } from 'react-router-dom';
import clsx from 'clsx';

// types
import { logoButtonTypes } from 'src/types';

const LogoButton = ({ text, to }) => (
    <Link to={to} className={clsx(['inline-flex', 'flex-row', 'items-center'])}>
        <img src='/img/android-chrome-192x192.png' alt='logo' width='24' />
        <span className={clsx(['ml-3', 'font-bold', 'text-2xl', 'leading-10', 'text-gray-100', 'uppercase'])}>{text}</span>
    </Link>
);

LogoButton.propTypes = logoButtonTypes;

export default LogoButton;
