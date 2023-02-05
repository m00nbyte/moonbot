// modules
import clsx from 'clsx';
import shallow from 'zustand/shallow';

// functions
import cardsList from 'src/functions/cardsList';

// components
import ActiveOffers from 'src/components/offers/Active';
import OpenOffers from 'src/components/offers/Open';

// state
import useStore from 'src/store';

// types
import { offersPageTypes } from 'src/types';

const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : process.env.REACT_APP_API_URL;

const stateSelector = (state) => ({
    loading: state.loading,
    language: state.language,
    current: state.current,
    account: state.account,
    token: state.auth.token,
    dispatch: state.dispatch
});

const Offers = ({ data, handleLoading }) => {
    const { loading, language, current, account, token, dispatch } = useStore(stateSelector, shallow);

    const activeCards = cardsList('active', data);
    const estimateCards = cardsList('estimate', data);
    const rateCards = cardsList('rates', data);
    const openCards = cardsList('open', data);

    const handleCancel = async (id) => {
        handleLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/data/offers`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    authorization: token
                },
                body: JSON.stringify({ current, id })
            });

            const json = await res.json();

            if (res.status === 200) {
                dispatch({
                    type: 'account',
                    value: { ...account, funding: json.offers }
                });
                dispatch({
                    type: 'toast',
                    value: { type: json.status ? 'success' : 'error', value: json.message }
                });
            } else {
                dispatch({
                    type: 'toast',
                    value: { type: 'error', value: res.statusText }
                });
            }
        } catch (error) {
            dispatch({
                type: 'toast',
                value: { type: 'error', value: 'failedBackend' }
            });
        }

        handleLoading(false);
    };

    return (
        <>
            <div className={clsx(['tour-offers-active', 'mb-4'])}>
                <ActiveOffers
                    loading={loading}
                    language={language}
                    data={data}
                    cards={{
                        active: activeCards,
                        estimate: estimateCards,
                        rates: rateCards
                    }}
                />
            </div>
            <div className={clsx(['tour-offers-open', 'mt-4'])}>
                <OpenOffers loading={loading} language={language} data={data} cards={openCards} handleCancel={handleCancel} />
            </div>
        </>
    );
};

Offers.propTypes = offersPageTypes;

export default Offers;
