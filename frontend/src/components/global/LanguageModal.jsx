// modules
import clsx from 'clsx';
import { DE, US } from 'country-flag-icons/react/3x2';

// types
import { languageModalTypes } from 'src/types';

const LanguageModal = ({ modal, modalText, handleModal, handleLanguage }) => {
    return (
        <>
            <div className={clsx(['fixed', 'inset-0', 'overflow-y-auto', 'transition-all', !modal ? 'opacity-0' : 'z-10'])}>
                <div
                    className={clsx(['w-full', 'h-full', 'fixed', 'inset-0', 'bg-black', 'opacity-40'])}
                    onClick={handleModal}
                ></div>
                <div className={clsx(['px-4', 'py-8', 'flex', 'items-center', 'min-h-screen'])}>
                    <div
                        className={clsx([
                            'w-full',
                            'max-w-lg',
                            'p-4',
                            'mx-auto',
                            'relative',
                            'bg-stone-300',
                            'dark:bg-stone-800',
                            'select-none',
                            'md:shadow'
                        ])}
                    >
                        <div className={clsx(['text-center'])}>
                            <h2 className={clsx(['mb-4', 'font-bold', 'text-xl', 'text-stone-800', 'dark:text-white'])}>
                                {modalText.title}
                            </h2>
                            <hr className={clsx(['mx-4', 'mb-4', 'border', 'border-1', 'border-stone-700'])} />
                            <div className={clsx(['mb-8', 'mx-2'])}>
                                {modalText.description.map((line, index) => (
                                    <p
                                        key={`modal-description-${index}`}
                                        className={clsx(['text-md', 'text-stone-500', 'dark:text-white'])}
                                    >
                                        {line}
                                    </p>
                                ))}
                            </div>
                            <div className={clsx(['mb-8', 'grid', 'grid-cols-2', 'gap-2', 'content-center'])}>
                                <US
                                    title='English'
                                    className={clsx(['w-12', 'm-auto', 'cursor-pointer'])}
                                    onClick={() => handleLanguage('en')}
                                />
                                <DE
                                    title='Deutsch'
                                    className={clsx(['w-12', 'm-auto', 'cursor-pointer'])}
                                    onClick={() => handleLanguage('de')}
                                />
                            </div>
                            <div className={clsx(['items-center', 'gap-2', 'mt-3', 'sm:flex'])}>
                                <button
                                    className={clsx([
                                        'w-full',
                                        'px-5',
                                        'py-3',
                                        'inline-flex',
                                        'items-center',
                                        'justify-center',
                                        'font-bold',
                                        'text-md',
                                        'text-white',
                                        'bg-rose-700',
                                        'hover:bg-rose-800',
                                        'transition-all'
                                    ])}
                                    onClick={handleModal}
                                >
                                    {modalText.cancel}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

LanguageModal.propTypes = languageModalTypes;

export default LanguageModal;
