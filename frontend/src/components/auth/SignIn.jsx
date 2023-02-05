// modules
import clsx from 'clsx';

// components
import TextInput from 'src/components/inputs/TextInput';
import CustomSpinner from 'src/components/global/CustomSpinner';

// strings
import strings from 'src/strings';

// types
import { signInTypes } from 'src/types';

const SignIn = ({ loading, toggle, register, handleSubmit, onSubmit, errors }) => {
    const localize = strings.auth.signIn;

    const signInGrid = [
        {
            type: 'email',
            name: 'email',
            label: null,
            info: null,
            placeholder: localize.email.placeholder,
            defaultValue: '',
            disabled: loading,
            autocomplete: true,
            autofocus: true
        },
        {
            type: 'password',
            name: 'password',
            label: null,
            info: null,
            placeholder: localize.password.placeholder,
            defaultValue: '',
            disabled: loading,
            autocomplete: true,
            autofocus: false
        }
    ];

    return (
        <>
            <div
                className={clsx([
                    'w-full',
                    'px-6',
                    'py-8',
                    'text-black',
                    'dark:text-white',
                    'bg-stone-100',
                    'dark:bg-stone-800',
                    'shadow-md'
                ])}
            >
                <h1 className={clsx(['mb-8', 'font-bold', 'text-3xl', 'text-center', 'tracking-wide', 'uppercase'])}>
                    {localize.title}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {signInGrid.map((item, index) => (
                        <div key={`auth-signIn_${index}`}>
                            <TextInput options={item} register={register} errors={errors} />
                        </div>
                    ))}

                    <button
                        type='submit'
                        className={clsx([
                            'w-full',
                            'px-5',
                            'py-3',
                            'my-1',
                            'inline-flex',
                            'items-center',
                            'justify-center',
                            'font-bold',
                            'text-md',
                            'text-white',
                            'bg-emerald-600',
                            'hover:bg-emerald-700',
                            'dark:bg-emerald-700',
                            'dark:hover:bg-emerald-800',
                            'transition-all'
                        ])}
                        disabled={loading}
                    >
                        {loading ? <CustomSpinner size={6} color={'text-white'} /> : localize.submit}
                    </button>
                </form>

                <div className={clsx(['sm:px-2', 'mt-4', 'text-sm', 'text-center', 'text-stone-900', 'dark:text-white'])}>
                    {strings.formatString(localize.agree, {
                        tos: (
                            <a
                                className={clsx([
                                    'no-underline',
                                    'text-stone-600',
                                    'dark:text-white',
                                    'hover:text-stone-900',
                                    'dark:hover:text-stone-300',
                                    'border-b',
                                    'border-stone-600',
                                    'dark:border-white',
                                    'hover:border-stone-900',
                                    'dark:hover:border-stone-300',
                                    'transition-all'
                                ])}
                                href='/terms'
                            >
                                {localize.tos}
                            </a>
                        ),
                        policy: (
                            <a
                                className={clsx([
                                    'no-underline',
                                    'text-stone-600',
                                    'dark:text-white',
                                    'hover:text-stone-900',
                                    'dark:hover:text-stone-300',
                                    'border-b',
                                    'border-stone-600',
                                    'dark:border-white',
                                    'hover:border-stone-900',
                                    'dark:hover:border-stone-300',
                                    'transition-all'
                                ])}
                                href='/privacy'
                            >
                                {localize.policy}
                            </a>
                        )
                    })}
                </div>
            </div>

            <div className={clsx(['mt-6', 'text-center', 'text-stone-600', 'dark:text-stone-400'])}>
                {strings.formatString(localize.switch, {
                    signUp: (
                        <button
                            className={clsx([
                                'no-underline',
                                'text-stone-600',
                                'dark:text-stone-400',
                                'hover:text-stone-900',
                                'dark:hover:text-stone-500',
                                'border-b',
                                'border-stone-600',
                                'dark:border-stone-400',
                                'hover:border-stone-900',
                                'dark:hover:border-stone-500',
                                'transition-all'
                            ])}
                            onClick={() => toggle(false)}
                            disabled={loading}
                        >
                            {localize.signUp}
                        </button>
                    )
                })}
            </div>
        </>
    );
};

SignIn.propTypes = signInTypes;

export default SignIn;
