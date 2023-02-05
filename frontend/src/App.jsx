// modules
import { useEffect, useCallback, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import moment from 'moment/min/moment-with-locales';
import { shallow } from 'zustand/shallow';

// components
import Layout from 'src/Layout';
import { Auth, Home, Strategy, Offers, Earnings, Settings, Terms, Privacy, Legal, NoPage } from 'src/pages';
import ScrollToTop from 'src/components/global/ScrollToTop';
import { notify } from 'src/components/global/CustomToast';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

const stateSelector = (state) => ({
    theme: state.theme,
    modal: state.modal,
    language: state.language,
    current: state.current,
    auth: state.auth,
    coins: state.coins,
    toast: state.toast,
    account: state.account,
    strategy: state.strategy,
    user: state.user,
    earnings: state.earnings,
    dispatch: state.dispatch
});

const App = () => {
    const { theme, modal, language, current, auth, coins, toast, account, strategy, earnings, user, dispatch } = useStore(
        stateSelector,
        shallow
    );
    const toastRef = useRef();

    const handleLoading = useCallback(
        async (value) => {
            dispatch({ type: 'loading', value });
        },
        [dispatch]
    );

    const handleUpdate = async (value) => {
        dispatch({ type: 'update', value });
    };

    const handleAuth = (value) => {
        dispatch({ type: 'auth', value: { ...auth, ...value } });
    };

    const handleCurrent = (e) => {
        const { value } = e;

        if (value !== current) {
            dispatch({ type: 'init', value: false });
            dispatch({ type: 'current', value });
        }
    };

    const handleTheme = (value) => {
        dispatch({ type: 'theme', value });
    };

    const handleModal = () => {
        dispatch({ type: 'modal', value: !modal });
    };

    const handleTour = () => {
        dispatch({ type: 'tour', value: { manual: false, active: false, step: 0 } });
    };

    useEffect(() => {
        const root = window.document.documentElement;

        let params = [];

        switch (theme) {
            case 'system':
                if (window.matchMedia('(prefers-color-scheme: dark').matches) {
                    params = ['light', 'dark'];
                } else {
                    params = ['dark', 'light'];
                }
                break;
            case 'dark':
                params = ['light', 'dark'];
                break;
            case 'light':
                params = ['dark', 'light'];
                break;
            default:
                break;
        }

        if (params.length === 2) {
            root.classList.remove(params[0]);
            root.classList.add(params[1]);
        }
    }, [theme]);

    useEffect(() => {
        if (toast.type && toast.value) {
            notify(toastRef, toast.type, strings.toasts[toast.value]);
            dispatch({ type: 'toast', value: { type: '', value: null } });
        }
    }, [toast, dispatch]);

    const domLanguage = (lang) => {
        const currentLanguage = lang || 'en';

        const root = window.document.documentElement;
        root.setAttribute('lang', currentLanguage);

        strings.setLanguage(currentLanguage);
        moment.locale(currentLanguage);
    };

    useEffect(() => {
        domLanguage(language);
    }, [language]);

    const setDefaultLanguage = useCallback(() => {
        domLanguage(language);
    }, [language]);

    useEffect(() => {
        setDefaultLanguage();
    }, [setDefaultLanguage]);

    return (
        <BrowserRouter>
            <ScrollToTop />
            <Routes>
                <Route
                    path="/"
                    element={
                        <Layout
                            strategy={strategy}
                            offers={{
                                open: account.funding?.length || 0,
                                active: account.lending?.length || 0
                            }}
                            earnings={earnings.earningsFull.totalSum}
                            handleLoading={handleLoading}
                            handleCurrent={handleCurrent}
                            handleTheme={handleTheme}
                            handleModal={handleModal}
                            handleTour={handleTour}
                        />
                    }
                >
                    <Route index element={<Home data={{ ...account, ...earnings, coins }} />} />
                    <Route path="strategy" element={<Strategy data={strategy} handleLoading={handleLoading} />} />
                    <Route path="offers" element={<Offers data={account} handleLoading={handleLoading} />} />
                    <Route path="earnings" element={<Earnings data={earnings} handleUpdate={handleUpdate} />} />
                    <Route path="settings" element={<Settings data={user} handleLoading={handleLoading} />} />
                </Route>
                <Route path="auth" element={<Auth auth={auth} handleAuth={handleAuth} handleLoading={handleLoading} />} />
                <Route path="terms" element={<Terms />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="legal" element={<Legal />} />
                <Route path="*" element={<NoPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
