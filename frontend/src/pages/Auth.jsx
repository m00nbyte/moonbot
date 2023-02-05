// modules
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment/min/moment-with-locales';
import { countries } from 'country-flag-icons';
import { shallow } from 'zustand/shallow';

// components
import SignIn from 'src/components/auth/SignIn';
import SignUp from 'src/components/auth/SignUp';
import { CustomToast } from 'src/components/global/CustomToast';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { authPageTypes } from 'src/types';

const API_URL = process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    loading: state.loading,
    language: state.language,
    dispatch: state.dispatch
});

const Auth = ({ auth, handleAuth, handleLoading }) => {
    const { loading, language, dispatch } = useStore(stateSelector, shallow);
    const navigate = useNavigate();

    const localize = strings.auth;

    const signUpSchema = Yup.object().shape({
        name: Yup.string()
            .required(localize.signUp.name.required)
            .min(3, localize.signUp.name.min)
            .max(30, localize.signUp.name.max)
            .matches(/^\w+$/, localize.signUp.name.matches),
        email: Yup.string()
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                localize.signUp.email.matches
            )
            .required(localize.signUp.email.required),
        password: Yup.string()
            .required(localize.signUp.password.required)
            .min(8, localize.signUp.password.min)
            .matches(/[a-z]/, localize.signUp.password.matchLowerCase)
            .matches(/[A-Z]/, localize.signUp.password.matchUpperCase)
            .matches(/[0-9]/, localize.signUp.password.matchNumber)
            .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.signUp.password.matchSpecial)
            .oneOf([Yup.ref('confirm_password')], localize.signUp.password.match),
        confirm_password: Yup.string()
            .required(localize.signUp.password.required)
            .when('password', {
                is: (value) => value?.length,
                then: Yup.string()
                    .min(8, localize.signUp.password.min)
                    .matches(/[a-z]/, localize.signUp.password.matchLowerCase)
                    .matches(/[A-Z]/, localize.signUp.password.matchUpperCase)
                    .matches(/[0-9]/, localize.signUp.password.matchNumber)
                    .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.signUp.password.matchSpecial)
                    .oneOf([Yup.ref('password')], localize.signUp.password.match)
            })
    });

    const signInSchema = Yup.object().shape({
        email: Yup.string()
            .required(localize.signIn.email.required)
            .matches(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                localize.signIn.email.matches
            ),
        password: Yup.string()
            .required(localize.signIn.password.required)
            .min(8, localize.signIn.password.min)
            .matches(/[a-z]/, localize.signIn.password.matchLowerCase)
            .matches(/[A-Z]/, localize.signIn.password.matchUpperCase)
            .matches(/[0-9]/, localize.signIn.password.matchNumber)
            .matches(/[!@#$%^&*(),.?":{}|<>]/, localize.signIn.password.matchSpecial)
    });

    const {
        watch,
        register: registerSignUp,
        handleSubmit: handleSubmitSignUp,
        formState: { errors: errorsSignUp }
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(signUpSchema)
    });

    const {
        register: registerSignIn,
        handleSubmit: handleSubmitSignIn,
        formState: { errors: errorsSignIn }
    } = useForm({
        mode: 'onTouched',
        resolver: yupResolver(signInSchema)
    });

    const handleToggle = () => {
        handleAuth({ toggle: !auth.toggle });
    };

    const postData = async (data) => {
        const type = ['signup', 'signin'][+auth.toggle];

        if (data.confirm_password) delete data.confirm_password;

        try {
            const res = await fetch(`${API_URL}/api/auth/${type}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const json = await res.json();

            return json;
        } catch (error) {
            return { status: false, message: 'failedBackend' };
        }
    };

    const onSubmit = async (data) => {
        handleLoading(true);

        const res = await postData(data);

        if (res.status) {
            handleAuth({ id: res.id, token: res.token });
            setTimeout(() => navigate('/'), 500);
        } else {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: res.message }
            });
        }

        handleLoading(false);
    };

    useEffect(() => {
        handleLoading(true);
        const value = strings.getInterfaceLanguage().split('-')[0];

        if (
            strings.getAvailableLanguages().includes(value) &&
            moment.locales().includes(value) &&
            countries.includes(value.replace('en', 'us').toUpperCase())
        ) {
            if (language === null) dispatch({ type: 'language', value });
            else dispatch({ type: 'language', value: language });
        }

        handleLoading(false);
    }, [language, dispatch, handleLoading, navigate]);

    return (
        <div className={clsx(['min-h-screen', 'flex', 'flex-col', 'bg-stone-200', 'dark:bg-stone-900'])}>
            <CustomToast />

            <div
                className={clsx([
                    'container',
                    'max-w-sm',
                    'px-2',
                    'mx-auto',
                    'flex-1',
                    'flex',
                    'flex-col',
                    'items-center',
                    'justify-center'
                ])}
            >
                <h1
                    className={clsx([
                        'mb-6',
                        'inline-flex',
                        'flex-row',
                        'space-x-3',
                        'items-center',
                        'font-bold',
                        'text-4xl',
                        'text-center',
                        'leading-10',
                        'text-black',
                        'dark:text-white',
                        'uppercase'
                    ])}
                >
                    <img src="/img/android-chrome-192x192.png" alt="logo" width="33" />
                    <span>moonbot</span>
                </h1>

                {auth.toggle ? (
                    <SignIn
                        loading={loading}
                        toggle={handleToggle}
                        register={registerSignIn}
                        handleSubmit={handleSubmitSignIn}
                        onSubmit={onSubmit}
                        errors={errorsSignIn}
                    />
                ) : (
                    <SignUp
                        loading={loading}
                        toggle={handleToggle}
                        register={registerSignUp}
                        watch={watch}
                        handleSubmit={handleSubmitSignUp}
                        onSubmit={onSubmit}
                        errors={errorsSignUp}
                    />
                )}
            </div>
        </div>
    );
};

Auth.propTypes = authPageTypes;

export default Auth;
