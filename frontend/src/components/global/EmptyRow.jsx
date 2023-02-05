// modules
import clsx from 'clsx';

// types
import { emptyRowTypes } from 'src/types';

const EmptyRow = ({ cols, text }) => {
    return (
        <tr
            className={clsx([
                'mb-10',
                'lg:mb-0',
                'flex',
                'flex-row',
                'flex-wrap',
                'lg:table-row',
                'lg:flex-row',
                'lg:flex-no-wrap',
                'bg-stone-100',
                'dark:bg-stone-800',
                'hover:cursor-default'
            ])}
        >
            <td
                colSpan={cols}
                className={clsx([
                    'w-full',
                    'lg:w-auto',
                    'p-3',
                    'lg:table-cell',
                    'lg:static',
                    'block',
                    'relative',
                    'text-right',
                    'lg:text-center',
                    'border',
                    'border-b',
                    'border-stone-400',
                    'dark:border-stone-600'
                ])}
            >
                {text}
            </td>
        </tr>
    );
};

EmptyRow.propTypes = emptyRowTypes;

export default EmptyRow;
