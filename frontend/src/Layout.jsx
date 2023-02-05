// modules
import { useEffect, useCallback, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment/min/moment-with-locales';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { countries } from 'country-flag-icons';
import { shallow } from 'zustand/shallow';

// functions
import { manualSidebar } from 'src/functions/toggleSidebar';
import sidebarList from 'src/functions/sidebarList';

// components
import LoadingPage from 'src/components/global/LoadingPage';
import Topbar from 'src/components/layout/Topbar';
import Sidebar from 'src/components/layout/Sidebar';
// import Footer from 'src/components/layout/Footer';
import TourWrapper from 'src/components/global/TourWrapper';
import LanguageModal from 'src/components/global/LanguageModal';
import { CustomToast, dismissAll } from 'src/components/global/CustomToast';

// state
import useStore from 'src/store';

// strings
import strings from 'src/strings';

// types
import { layoutPageTypes } from 'src/types';

const API_URL = process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    init: state.init,
    loading: state.loading,
    theme: state.theme,
    modal: state.modal,
    language: state.language,
    coins: state.coins,
    user: state.user,
    current: state.current,
    toastData: state.toast,
    token: state.auth.token,
    dispatch: state.dispatch
});

const Layout = ({ strategy, offers, earnings, handleLoading, handleCurrent, handleTheme, handleModal, handleTour }) => {
    const scrollbarsRef = useRef();
    const sidebarRef = useRef();
    const hamburgerRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();

    const { loading, theme, modal, language, init, coins, current, token, dispatch } = useStore(stateSelector, shallow);
    const { modal: modalText } = strings;

    const sidebarItems = sidebarList(strategy.active, offers, earnings, current);

    const manualTour = () => {
        navigate('/settings', true);
        dispatch({ type: 'tour', value: { active: true, manual: true, step: 1 } });
    };

    const handleLanguage = (value) => {
        if (
            strings.getAvailableLanguages().includes(value) &&
            moment.locales().includes(value) &&
            countries.includes(value.replace('en', 'us').toUpperCase())
        ) {
            dispatch({ type: 'init', value: false });
            handleLoading(true);

            dispatch({ type: 'language', value });

            setTimeout(() => {
                handleTour();
                handleModal();

                // navigate(0);
                handleLoading(false);
            }, 200);
        }
    };

    const handleLogout = () => {
        dispatch({ type: 'auth', value: { id: null, token: null } });
        navigate('/auth');
    };

    const fetchList = useCallback(async () => {
        if (current === '') {
            try {
                const res = await fetch(`${API_URL}/api/coin/list`, {
                    headers: {
                        authorization: token
                    }
                });

                if (res.status === 200) {
                    const json = await res.json();

                    if (!json || json.length === 0) {
                        return;
                    }

                    if (!json.status) {
                        dispatch({ type: 'toast', value: { type: 'error', value: json.message } });
                    } else {
                        dispatch({ type: 'coins', value: json.data });
                    }
                } else {
                    dispatch({ type: 'toast', value: { type: 'error', value: res.statusText } });

                    if (res.status === 403) {
                        dispatch({ type: 'auth', value: { id: null, token: null } });
                    }
                }
            } catch (error) {
                dispatch({
                    type: 'toast',
                    value: { type: 'error', value: 'failedBackend' }
                });
            }
        }
    }, [current, token, dispatch]);

    const fetchCoin = useCallback(async () => {
        if (current !== '') {
            if (!init) handleLoading(true);

            try {
                const res = await fetch(`${API_URL}/api/coin/${current}`, {
                    headers: {
                        authorization: token
                    }
                });

                if (res.status === 200) {
                    const json = await res.json();

                    if (json.status) {
                        if (!json || json.length === 0) {
                            return;
                        }

                        const { rStats, fList, cData, sData, eData, uData } = json;

                        if (!init) {
                            dispatch({ type: 'init', value: true });
                            if (sData) dispatch({ type: 'strategy', value: sData });
                            if (eData) dispatch({ type: 'earnings', value: eData });
                            if (uData) dispatch({ type: 'user', value: uData });
                        }

                        if (rStats) dispatch({ type: 'stats', value: rStats });
                        if (fList) dispatch({ type: 'coins', value: fList });
                        if (cData) dispatch({ type: 'account', value: cData });
                    } else {
                        dispatch({ type: 'toast', value: { type: 'error', value: json.message } });
                    }
                } else {
                    dispatch({ type: 'toast', value: { type: 'error', value: res.statusText } });

                    if (res.status === 403) {
                        dispatch({ type: 'auth', value: { id: null, token: null } });
                    }
                }
            } catch (error) {
                dispatch({
                    type: 'toast',
                    value: { type: 'error', value: 'failedBackend' }
                });
            }

            if (!init) handleLoading(false);
        }
    }, [current, dispatch, handleLoading, init, token]);

    const fetchUser = useCallback(async () => {
        if (!init) handleLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/user/data`, {
                headers: {
                    authorization: token
                }
            });

            if (res.status === 200) {
                const json = await res.json();

                if (json.status) {
                    if (!json || json.length === 0) {
                        return;
                    }

                    const { data } = json;

                    if (data) dispatch({ type: 'user', value: data });
                } else {
                    dispatch({ type: 'toast', value: { type: 'error', value: json.message } });
                }
            } else {
                dispatch({ type: 'toast', value: { type: 'error', value: res.statusText } });

                if (res.status === 403) {
                    dispatch({ type: 'auth', value: { id: null, token: null } });
                }
            }
        } catch (error) {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: 'failedBackend' }
            });
        }

        if (!init) handleLoading(false);
    }, [dispatch, handleLoading, init, token]);

    useEffect(() => {
        let interval = null;

        if (token !== null) {
            if (current === '') {
                fetchList();
                fetchUser();
            }

            fetchCoin();

            const ms = 1000 * 60; // 60 seconds
            interval = setInterval(fetchCoin, ms);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [current, token, fetchList, fetchCoin, fetchUser]);

    useEffect(() => {
        dismissAll();

        if (location.pathname.slice(1) !== 'auth' && token === null) {
            dispatch({ type: 'toast', value: { type: 'error', value: 'forbidden' } });
            navigate('/auth');
        } else {
            manualSidebar(hamburgerRef, sidebarRef, true);
            scrollbarsRef.current.scrollToTop();
        }
    }, [token, location, navigate, dispatch]);

    return (
        <TourWrapper handleTour={handleTour}>
            <LoadingPage loading={!init && loading} />

            <div
                className={clsx([
                    'flex',
                    'flex-row',
                    'w-full',
                    'min-h-screen',
                    'font-body',
                    'text-black',
                    'dark:text-white',
                    'bg-stone-200',
                    'dark:bg-stone-900',
                    'transition-all',
                    'duration-150'
                ])}
            >
                <CustomToast />

                <LanguageModal modal={modal} modalText={modalText} handleModal={handleModal} handleLanguage={handleLanguage} />

                <Sidebar
                    sidebarRef={sidebarRef}
                    location={location}
                    items={sidebarItems}
                    coins={coins}
                    current={current}
                    theme={theme}
                    language={language}
                    manualTour={manualTour}
                    handleTheme={handleTheme}
                    handleModal={handleModal}
                    handleCurrent={handleCurrent}
                    handleLogout={handleLogout}
                />

                <main className={clsx(['tour-root', 'main', 'flex', 'flex-col', 'flex-grow', 'md:ml-64'])}>
                    <Topbar hamburgerRef={hamburgerRef} sidebarRef={sidebarRef} />

                    <Scrollbars ref={scrollbarsRef} style={{ height: '100%' }}>
                        <div
                            className={clsx([
                                'main-content',
                                'flex',
                                'flex-col',
                                'flex-grow',
                                'pt-2',
                                'pb-4',
                                'px-4',
                                'xl:px-20',
                                'xl:max-w-6xl',
                                'xl:mx-auto'
                            ])}
                        >
                            <Outlet />
                        </div>

                        {/* <Footer /> */}
                    </Scrollbars>
                </main>
            </div>
        </TourWrapper>
    );
};

Layout.propTypes = layoutPageTypes;

export default Layout;
