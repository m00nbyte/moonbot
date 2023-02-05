// modules
import clsx from 'clsx';
import { ToastContainer, toast } from 'react-toastify';

const notify = (ref, type, text) => {
    return (ref.current = toast[type](text, {
        // toastId: `${type}-${text}`,
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        newestOnTop: false,
        rtl: false,
        closeButton: false,
        pauseOnFocusLoss: true
    }));
};

const dismiss = (ref) => toast.dismiss(ref.current);

const dismissAll = () => toast.dismiss();

const contextClass = {
    success: 'bg-emerald-600 dark:bg-emerald-800',
    error: 'bg-rose-600 dark:bg-rose-800',
    default: 'bg-stone-600 dark:bg-stone-700'
};

const CustomToast = () => {
    return (
        <ToastContainer
            limit={2}
            theme={'light'}
            toastClassName={({ type }) =>
                clsx([
                    'relative',
                    'flex',
                    'p-1',
                    'min-h-10',
                    'justify-between',
                    'overflow-hidden',
                    'cursor-pointer',
                    'selection-none',
                    contextClass[type || 'default']
                ])
            }
            bodyClassName={() =>
                clsx([
                    'text-sm',
                    'text-white',
                    'dark:text-white',
                    'text-md',
                    'font-medium',
                    'flex',
                    'space-x-2',
                    'px-4',
                    'py-5'
                ])
            }
            style={{
                '--toastify-icon-color-success': '#ffffff',
                '--toastify-icon-color-error': '#ffffff',
                '--toastify-color-progress-success': 'rgba(0,0,0,0.2)',
                '--toastify-color-progress-error': 'rgba(0,0,0,0.2)'
            }}
        />
    );
};

export { notify, dismiss, dismissAll, CustomToast };
