// modules
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Lightbox from 'yet-another-react-lightbox';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { shallow } from 'zustand/shallow';

// components
import CustomSpinner from 'src/components/global/CustomSpinner';
import StateInput from 'src/components/inputs/StateInput';
import TextInput from 'src/components/inputs/TextInput';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { settingsPageTypes } from 'src/types';

const API_URL = process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    loading: state.loading,
    user: state.user,
    lightbox: state.lightbox,
    token: state.auth.token,
    dispatch: state.dispatch
});

const Settings = ({ data, handleLoading }) => {
    const { loading, user, lightbox, token, dispatch } = useStore(stateSelector, shallow);

    const {
        name,
        email,
        api: { key: apiKey, secret: apiSecret }
    } = data;
    const localize = strings.settings;

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .matches(/^\w+$/, localize.details.name.matches)
            .min(3, localize.details.name.min)
            .max(30, localize.details.name.max)
            .notRequired(),
        email: Yup.string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                localize.details.email.matches
            )
            .notRequired(),
        apiKey: Yup.string().notRequired(),
        apiSecret: Yup.string().notRequired(),
        pwCurrent: Yup.string()
            .required(localize.password.current.required)
            .min(8, localize.password.current.min)
            .matches(/[a-z]/, localize.password.current.matchLowerCase)
            .matches(/[A-Z]/, localize.password.current.matchUpperCase)
            .matches(/[0-9]/, localize.password.current.matchNumber)
            .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.password.current.matchSpecial),
        pwNew: Yup.string()
            .when('pwCurrent', {
                is: (value) => value?.length,
                then: Yup.string()
                    .min(8, localize.password.new.min)
                    .matches(/[a-z]/, localize.password.new.matchLowerCase)
                    .matches(/[A-Z]/, localize.password.new.matchUpperCase)
                    .matches(/[0-9]/, localize.password.new.matchNumber)
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.password.new.matchSpecial)
                    .oneOf([Yup.ref('pwConfirm')], localize.password.new.match)
                    .notOneOf([Yup.ref('pwCurrent')], localize.password.new.same)
            })
            .notRequired(),
        pwConfirm: Yup.string()
            .when('pwCurrent', {
                is: (value) => value?.length,
                then: Yup.string()
                    .min(8, localize.password.confirm.min)
                    .matches(/[a-z]/, localize.password.confirm.matchLowerCase)
                    .matches(/[A-Z]/, localize.password.confirm.matchUpperCase)
                    .matches(/[0-9]/, localize.password.confirm.matchNumber)
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.password.confirm.matchSpecial)
                    .oneOf([Yup.ref('pwNew')], localize.password.confirm.match)
                    .notOneOf([Yup.ref('pwCurrent')], localize.password.confirm.same)
            })
            .notRequired()
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(formSchema)
    });

    const userGrid = [
        [
            {
                type: 'text',
                name: 'name',
                label: localize.details.name.label,
                info: null,
                placeholder: '...',
                value: name,
                disabled: loading,
                autocomplete: false,
                autofocus: false
            },
            {
                type: 'email',
                name: 'email',
                label: localize.details.email.label,
                info: null,
                placeholder: '...',
                value: email,
                disabled: loading,
                autocomplete: false,
                autofocus: false
            }
        ]
    ];

    const apiGrid = [
        [
            {
                type: 'text',
                name: 'apiKey',
                label: localize.api.key.label,
                info: null,
                placeholder: '...',
                value: apiKey,
                disabled: loading,
                autocomplete: false,
                autofocus: false
            },
            {
                type: 'text',
                name: 'apiSecret',
                label: localize.api.secret.label,
                info: null,
                placeholder: '...',
                value: apiSecret,
                disabled: loading,
                autocomplete: false,
                autofocus: false
            }
        ]
    ];

    const passwordGrid = [
        [
            {
                type: 'password',
                name: 'pwCurrent',
                label: localize.password.current.label,
                info: null,
                placeholder: '...',
                defaultValue: '',
                disabled: loading,
                autocomplete: true,
                autofocus: false
            },
            {
                type: 'password',
                name: 'pwNew',
                label: localize.password.new.label,
                info: null,
                placeholder: '...',
                defaultValue: '',
                disabled: loading,
                autocomplete: true,
                autofocus: false
            },
            {
                type: 'password',
                name: 'pwConfirm',
                label: localize.password.confirm.label,
                info: null,
                placeholder: '...',
                defaultValue: '',
                disabled: loading,
                autocomplete: true,
                autofocus: false
            }
        ]
    ];

    const toggleImageModal = (value) => {
        dispatch({ type: 'lightbox', value });
    };

    const updateData = async (data) => {
        try {
            const res = await fetch(`${API_URL}/api/user/edit`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            return json;
        } catch (error) {
            return { status: false, message: 'failedBackend' };
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        let current = {
            ...user
        };

        if (name === 'name') {
            current.name = name.toLowerCase().replace(/\s/g, '_');
        }

        if (name === 'apiKey') {
            current.api.key = value;
        } else if (name === 'apiSecret') {
            current.api.secret = value;
        } else {
            current[name] = value;
        }

        dispatch({
            type: 'user',
            value: current
        });
    };

    const onSubmit = async (form) => {
        handleLoading(true);

        const options = {
            ...Object.fromEntries(Object.entries(data).filter(([key]) => !key.includes('_id') && !key.includes('__v'))), // check if this filter is needed
            ...Object.fromEntries(Object.entries(form).filter(([key]) => key.includes('pw') && !key.includes('pwConfirm')))
        };

        const res = await updateData(options);

        if (res.status) {
            dispatch({ type: 'user', value: data });
            dispatch({
                type: 'toast',
                value: { type: 'success', value: res.message }
            });
        } else {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: res.message }
            });
        }

        handleLoading(false);
    };

    return (
        <>
            <h1 className={clsx(['mt-2', 'mb-3', 'text-3xl', 'font-bold', 'uppercase'])}>{localize.title}</h1>

            <Lightbox
                open={lightbox}
                close={() => toggleImageModal(false)}
                slides={[
                    {
                        src: '/img/bitfinex_setup.png',
                        title: localize.lightbox.title,
                        description: localize.lightbox.description
                    }
                ]}
                carousel={{ finite: true }}
                render={{
                    buttonPrev: () => null,
                    buttonNext: () => null
                }}
                plugins={[Captions, Zoom]}
            />

            <div className={clsx(['mt-3', 'flex', 'justify-start'])}>
                <div className={clsx(['w-full'])}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div
                            className={clsx([
                                'px-5',
                                'pt-3',
                                'pb-0',
                                'bg-stone-100',
                                'dark:bg-stone-800',
                                'border',
                                'border-stone-300',
                                'dark:border-stone-700'
                            ])}
                        >
                            <h2 className={clsx(['mb-4', 'font-bold', 'text-xl', 'uppercase'])}>{localize.details.title}</h2>
                            {userGrid.map((row, rowIndex) => (
                                <div
                                    key={`settings-userGrid_${rowIndex}`}
                                    className={clsx([
                                        'mb-4',
                                        'grid',
                                        'space-y-4',
                                        'md:space-x-4',
                                        'md:space-y-0',
                                        (row.length % 3 === 0 && 'md:grid-cols-3') ||
                                            (row.length % 2 === 0 && 'md:grid-cols-2') ||
                                            (row.length === 1 && 'md:grid-cols-2') ||
                                            'md:grid-cols-2'
                                    ])}
                                >
                                    {row.map((col, colIndex) => (
                                        <div key={`settings-userGrid_${rowIndex}_${colIndex}`}>
                                            <StateInput
                                                options={col}
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div
                            className={clsx([
                                'tour-settings-api',
                                'px-5',
                                'pt-3',
                                'pb-0',
                                'mt-6',
                                'bg-stone-100',
                                'dark:bg-stone-800',
                                'border',
                                'border-stone-300',
                                'dark:border-stone-700'
                            ])}
                        >
                            <h2 className={clsx(['mb-4', 'font-bold', 'text-xl', 'uppercase'])}>{localize.api.title}</h2>
                            <div className={clsx(['mb-4', 'flex', 'space-x-1', 'items-center'])}>
                                <div className={clsx(['i-[mdi-numeric-one-box-outline]', 'mr-1', 'text-2xl'])} />
                                {strings.formatString(localize.info.connectApi.label, {
                                    link: (
                                        <a
                                            className={clsx([
                                                'flex',
                                                'space-x-1',
                                                'items-center',
                                                'text-lg',
                                                'text-stone-800',
                                                'hover:text-stone-600',
                                                'dark:text-stone-100',
                                                'dark:hover:text-stone-300',
                                                'border-b',
                                                'border-stone-800',
                                                'dark:border-stone-100',
                                                'hover:border-b-stone-600',
                                                'dark:hover:border-b-stone-300'
                                            ])}
                                            href="https://support.bitfinex.com/hc/en-us/articles/115003363429-How-to-create-and-revoke-a-Bitfinex-API-Key"
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <span className={clsx(['flex', 'space-x-1.5', 'items-center'])}>
                                                <span>{localize.info.connectApi.link}</span>
                                                <div className={clsx(['i-[ci-external-link]'])} />
                                            </span>
                                        </a>
                                    )
                                })}
                            </div>
                            <div className={clsx(['mb-4', 'flex', 'space-x-1', 'items-center'])}>
                                <div className={clsx(['i-[mdi-numeric-two-box-outline]', 'mr-1', 'text-2xl'])} />
                                {strings.formatString(localize.info.permissions.label, {
                                    link: (
                                        <button
                                            type="button"
                                            className={clsx([
                                                'flex',
                                                'space-x-1',
                                                'items-center',
                                                'text-lg',
                                                'text-stone-800',
                                                'hover:text-stone-600',
                                                'dark:text-stone-100',
                                                'dark:hover:text-stone-300',
                                                'border-b',
                                                'border-stone-800',
                                                'dark:border-stone-100',
                                                'hover:border-b-stone-600',
                                                'dark:hover:border-b-stone-300'
                                            ])}
                                            onClick={() => toggleImageModal(true)}
                                        >
                                            <span className={clsx(['flex', 'space-x-1.5', 'items-center'])}>
                                                <span>{localize.info.permissions.link}</span>
                                                <div className={clsx(['i-[ci-external-link]'])} />
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                            <div className={clsx(['mb-6', 'flex', 'space-x-1', 'items-center'])}>
                                <div className={clsx(['i-[mdi-numeric-three-box-outline]', 'mr-1', 'text-2xl'])} />
                                <span>{localize.info.enterData}</span>
                            </div>
                            {apiGrid.map((row, rowIndex) => (
                                <div
                                    key={`settings-apiGrid_${rowIndex}`}
                                    className={clsx([
                                        'mb-4',
                                        'grid',
                                        'space-y-4',
                                        'md:space-y-0',
                                        'md:space-x-4',
                                        (row.length % 3 === 0 && 'md:grid-cols-3') ||
                                            (row.length % 2 === 0 && 'md:grid-cols-2') ||
                                            (row.length === 1 && 'md:grid-cols-2') ||
                                            'md:grid-cols-2'
                                    ])}
                                >
                                    {row.map((col, colIndex) => (
                                        <div key={`settings-apiGrid_${rowIndex}_${colIndex}`}>
                                            <StateInput
                                                options={col}
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div
                            className={clsx([
                                'px-5',
                                'pt-3',
                                'pb-0',
                                'mt-6',
                                'bg-stone-100',
                                'dark:bg-stone-800',
                                'border',
                                'border-stone-300',
                                'dark:border-stone-700'
                            ])}
                        >
                            <h2 className={clsx(['mb-4', 'font-bold', 'text-xl', 'uppercase'])}>{localize.password.title}</h2>
                            {passwordGrid.map((row, rowIndex) => (
                                <div
                                    key={`settings-passwordGrid_${rowIndex}`}
                                    className={clsx([
                                        'mb-4',
                                        'grid',
                                        'space-y-4',
                                        'md:space-y-0',
                                        'md:space-x-4',
                                        (row.length % 3 === 0 && 'md:grid-cols-3') ||
                                            (row.length % 2 === 0 && 'md:grid-cols-2') ||
                                            (row.length === 1 && 'md:grid-cols-2') ||
                                            'md:grid-cols-2'
                                    ])}
                                >
                                    {row.map((col, colIndex) => (
                                        <div key={`settings-passwordGrid_${rowIndex}_${colIndex}`}>
                                            <TextInput
                                                options={col}
                                                register={register}
                                                errors={errors}
                                                handleChange={handleChange}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className={clsx(['pt-8', 'flex', 'justify-between'])}>
                            <button
                                type="submit"
                                className={clsx([
                                    'w-full',
                                    'px-5',
                                    'py-3',
                                    '-mt-2',
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
                                {loading ? <CustomSpinner size={6} color={'text-white'} /> : localize.save}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

Settings.propTypes = settingsPageTypes;

export default Settings;
