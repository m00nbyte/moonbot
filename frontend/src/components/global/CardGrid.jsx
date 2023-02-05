// modules
import clsx from 'clsx';

// types
import { cardGridTypes } from 'src/types';

const CardGrid = ({ data }) => {
    const groupCards = (items, n) =>
        items.reduce((acc, x, i) => {
            const idx = Math.floor(i / n);
            acc[idx] = [...(acc[idx] || []), x];
            return acc;
        }, []);

    return (
        <>
            {groupCards(data, data.length % 3 === 0 ? 3 : data.length % 2 === 0 ? 2 : data.length === 1 ? 1 : 2).map(
                (block, rIndex) => (
                    <div
                        key={`custom-card-block-${rIndex}`}
                        className={clsx(['flex', 'flex-col', 'lg:flex-row', 'lg:space-x-2'])}
                    >
                        {block.map(({ color, border, icon, title, value }, index) => (
                            <div
                                key={`custom-card-${index}-${title.toLowerCase().replace(' ', '-')}`}
                                className={clsx([
                                    'w-full',
                                    'pt-3',
                                    data.length % 3 === 0 && 'lg:w-1/3',
                                    data.length % 2 === 0 && 'lg:w-1/2'
                                ])}
                            >
                                <div
                                    className={clsx([
                                        'p-2',
                                        'border',
                                        'border-stone-200',
                                        'dark:border-stone-700',
                                        'shadow',
                                        color
                                    ])}
                                >
                                    <div className={clsx(['flex', 'flex-row', 'items-center'])}>
                                        <div className={clsx(['pl-1', 'pr-4', 'flex-shrink'])}>
                                            <div className={clsx(['text-white', icon])} style={{ fontSize: '33px' }} />
                                        </div>
                                        <div className={clsx(['flex-1', 'text-right'])}>
                                            <h5 className={clsx(['text-white', 'uppercase'])}>{title}</h5>
                                            <h3 className={clsx(['text-xl', 'text-white'])}>{value}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </>
    );
};

CardGrid.propTypes = cardGridTypes;

export default CardGrid;
