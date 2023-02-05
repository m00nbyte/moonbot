// modules
import clsx from 'clsx';

// components
import CustomSpinner from 'src/components/global/CustomSpinner';
import TextInput from 'src/components/inputs/TextInput';

// strings
import strings from 'src/strings';

// types
import { signUpTypes } from 'src/types';

const SignUp = ({ loading, toggle, register, watch, handleSubmit, onSubmit, errors }) => {
    const localize = strings.auth.signUp;

    const signUpGrid = [
        {
            type: 'text',
            name: 'name',
            label: null,
            info: null,
            placeholder: localize.name.placeholder,
            defaultValue: '',
            disabled: loading,
            autocomplete: true,
            autofocus: true
        },
        {
            type: 'email',
            name: 'email',
            label: null,
            info: null,
            placeholder: localize.email.placeholder,
            defaultValue: '',
            disabled: loading,
            autocomplete: true,
            autofocus: false
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
        },
        {
            type: 'password',
            name: 'confirm_password',
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
                <h1 className={clsx(['mb-8', 'font-bold', 'text-center', 'text-3xl', 'tracking-wide', 'uppercase'])}>
                    {localize.title}
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    {signUpGrid.map((item, index) => (
                        <div key={`auth-signUp_${index}`}>
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

                <div className={clsx(['mt-4', 'text-center', 'text-sm', 'text-stone-900', 'dark:text-white'])}>
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
                    signIn: (
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
                            onClick={() => toggle(true)}
                            disabled={loading}
                        >
                            {localize.signIn}
                        </button>
                    )
                })}
            </div>
        </>
    );
};

SignUp.propTypes = signUpTypes;

export default SignUp;
