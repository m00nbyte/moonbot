// modules
import PropTypes from 'prop-types';

// #region auth
export const signInTypes = PropTypes.exact({
    loading: PropTypes.bool.isRequired,
    errors: PropTypes.objectOf(
        PropTypes.exact({
            type: PropTypes.string.isRequired,
            message: PropTypes.string.isRequired,
            ref: PropTypes.instanceOf(Element).isRequired
        })
    ),
    toggle: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}).isRequired;

export const signUpTypes = PropTypes.exact({
    ...signInTypes,
    watch: PropTypes.func.isRequired
}).isRequired;
// #endregion

// #region buttons
export const logoButtonTypes = PropTypes.exact({
    text: PropTypes.string.isRequired,
    to: PropTypes.string
}).isRequired;

export const tourButtonTypes = PropTypes.exact({
    text: PropTypes.string.isRequired,
    manualTour: PropTypes.func.isRequired
}).isRequired;

export const themeButtonTypes = PropTypes.exact({
    text: PropTypes.exact({
        light: PropTypes.string.isRequired,
        dark: PropTypes.string.isRequired
    }).isRequired,
    theme: PropTypes.string.isRequired,
    handleTheme: PropTypes.func.isRequired
}).isRequired;

export const languageButtonTypes = PropTypes.exact({
    text: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired
}).isRequired;

export const logoutButtonTypes = PropTypes.exact({
    text: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired
}).isRequired;
// #endregion

// #region charts
export const lineChartTypes = PropTypes.exact({
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    labelName: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    customTooltip: PropTypes.func
}).isRequired;

export const areaChartTypes = PropTypes.exact({
    theme: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    labelName: PropTypes.string,
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.number).isRequired,
    customTooltip: PropTypes.func
}).isRequired;
// #endregion

// #region global
export const alertBoxTypes = PropTypes.exact({
    type: PropTypes.string.isRequired,
    icon: PropTypes.string,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    link: PropTypes.string
}).isRequired;

export const languageModalTypes = PropTypes.exact({
    modal: PropTypes.bool.isRequired,
    modalText: PropTypes.string.isRequired,
    handleModal: PropTypes.func.isRequired,
    handleLanguage: PropTypes.func.isRequired
}).isRequired;

export const cardGridTypes = PropTypes.exact({
    data: PropTypes.arrayOf(
        PropTypes.exact({
            color: PropTypes.string.isRequired,
            border: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    )
}).isRequired;

export const customSpinnerTypes = PropTypes.exact({
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
}).isRequired;

export const emptyRowTypes = PropTypes.exact({
    cols: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired
}).isRequired;
// #endregion

// #region inputs
const inputFieldTypes = PropTypes.exact({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    info: PropTypes.string,
    label: PropTypes.string,
    mobileLabel: PropTypes.bool,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    disabled: PropTypes.bool,
    autocomplete: PropTypes.bool,
    autofocus: PropTypes.bool,
    validation: PropTypes.exact({
        required: PropTypes.exact({ value: PropTypes.bool.isRequired, message: PropTypes.string.isRequired }),
        min: PropTypes.exact({ value: PropTypes.number.isRequired, message: PropTypes.string.isRequired }),
        max: PropTypes.exact({ value: PropTypes.number.isRequired, message: PropTypes.string.isRequired }),
        minLength: PropTypes.exact({ value: PropTypes.number.isRequired, message: PropTypes.string.isRequired }),
        maxLength: PropTypes.exact({ value: PropTypes.number.isRequired, message: PropTypes.string.isRequired }),
        pattern: PropTypes.exact({
            value: PropTypes.instanceOf(RegExp).isRequired,
            message: PropTypes.string.isRequired
        }),
        validate: PropTypes.func
    })
}).isRequired;

const inputErrorTypes = PropTypes.objectOf(
    PropTypes.exact({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
        ref: PropTypes.instanceOf(Element).isRequired
    })
);

export const inputWrapperTypes = PropTypes.exact({
    name: PropTypes.string.isRequired,
    info: PropTypes.string,
    label: PropTypes.string,
    mobileLabel: PropTypes.bool,
    errors: inputErrorTypes,
    children: PropTypes.object.isRequired
}).isRequired;

export const numberInputTypes = PropTypes.exact({
    options: PropTypes.exact({
        ...inputFieldTypes,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }),
    register: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    error: inputErrorTypes
}).isRequired;

export const stateInputTypes = PropTypes.exact({
    options: PropTypes.exact({
        ...inputFieldTypes,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }),
    register: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    error: inputErrorTypes
}).isRequired;

export const textInputTypes = PropTypes.exact({
    options: PropTypes.exact({
        ...inputFieldTypes,
        defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    }),
    register: PropTypes.func.isRequired,
    error: inputErrorTypes
}).isRequired;
// #endregion

// #region layout
export const sidebarTypes = PropTypes.exact({
    coins: PropTypes.arrayOf(PropTypes.string),
    current: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.exact({
            name: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            to: PropTypes.string,
            badge: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        })
    ),
    location: PropTypes.exact({
        pathname: PropTypes.string.isRequired,
        search: PropTypes.string,
        hash: PropTypes.string,
        state: PropTypes.string,
        key: PropTypes.string
    }),
    sidebarRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    manualTour: PropTypes.func.isRequired,
    handleTheme: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    handleCurrent: PropTypes.func.isRequired,
    handleLogout: PropTypes.func.isRequired
}).isRequired;

export const topbarTypes = PropTypes.exact({
    hamburgerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    sidebarRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) })
}).isRequired;
// #endregion

// #region strategies
const simpleStrategyTemplate = PropTypes.exact({
    minAmount: PropTypes.number.isRequired,
    realMinAmount: PropTypes.number,
    minRate: PropTypes.number.isRequired,
    minPeriod: PropTypes.number.isRequired
}).isRequired;

const equalStrategyTemplate = PropTypes.exact({
    minAmount: PropTypes.number.isRequired,
    realMinAmount: PropTypes.number,
    splitAllIn: PropTypes.number.isRequired,
    splitUnit: PropTypes.number.isRequired,
    overAmount: PropTypes.number.isRequired,
    periodMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number).isRequired).isRequired
}).isRequired;

const pyramidStrategyTemplate = PropTypes.exact({
    minAmount: PropTypes.number.isRequired,
    realMinAmount: PropTypes.number,
    minRate: PropTypes.number.isRequired,
    lowBoundRate: PropTypes.number.isRequired,
    upBoundRate: PropTypes.number.isRequired,
    growExponential: PropTypes.number.isRequired,
    overAmount: PropTypes.number.isRequired,
    skipRemaining: PropTypes.number.isRequired,
    rapMap: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number, PropTypes.number, PropTypes.number).isRequired).isRequired
}).isRequired;

const fullStrategyTemplate = PropTypes.exact({
    _id: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    active: PropTypes.string.isRequired,
    select: PropTypes.string.isRequired,
    types: PropTypes.exact({
        simple: simpleStrategyTemplate,
        equal: equalStrategyTemplate,
        pyramid: pyramidStrategyTemplate
    }).isRequired
}).isRequired;

const strategyTypesTemplate = PropTypes.exact({
    loading: PropTypes.bool.isRequired,
    handleChange: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
}).isRequired;

export const simpleStrategyTypes = PropTypes.exact({
    ...strategyTypesTemplate,
    data: simpleStrategyTemplate
}).isRequired;

export const equalStrategyTypes = PropTypes.exact({
    ...strategyTypesTemplate,
    data: equalStrategyTemplate,
    handleRow: PropTypes.func.isRequired
}).isRequired;

export const pyramidStrategyTypes = PropTypes.exact({
    ...strategyTypesTemplate,
    data: pyramidStrategyTemplate,
    handleRow: PropTypes.func.isRequired
}).isRequired;
// #endregion

// #region offers
const fullOffersTemplate = PropTypes.exact({
    coins: PropTypes.arrayOf(PropTypes.string),
    currency: PropTypes.string,
    balance: PropTypes.number,
    availableBalance: PropTypes.number,
    minAmount: PropTypes.number,
    timestamp: PropTypes.number,
    funding: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.number.isRequired,
            status: PropTypes.string.isRequired,
            created: PropTypes.number.isRequired,
            updated: PropTypes.number.isRequired,
            type: PropTypes.string.isRequired,
            initial_amount: PropTypes.number.isRequired,
            remaining_amount: PropTypes.number.isRequired,
            rate: PropTypes.number.isRequired,
            period: PropTypes.number.isRequired,
            hidden: PropTypes.bool.isRequired
        })
    ),
    lending: PropTypes.arrayOf(
        PropTypes.exact({
            amount: PropTypes.number.isRequired,
            period: PropTypes.number.isRequired,
            rate: PropTypes.string.isRequired,
            apy: PropTypes.string.isRequired,
            exp: PropTypes.number.isRequired
        })
    ),
    rates: PropTypes.exact({
        ask: PropTypes.number.isRequired,
        bid: PropTypes.number.isRequired
    }),
    stats: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number))
}).isRequired;

export const activeOffersTypes = PropTypes.exact({
    loading: PropTypes.bool.isRequired,
    data: fullOffersTemplate,
    cards: PropTypes.objectOf(
        PropTypes.arrayOf(
            PropTypes.exact({
                color: PropTypes.string.isRequired,
                border: PropTypes.string.isRequired,
                icon: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired
            })
        )
    )
}).isRequired;

export const openOffersTypes = PropTypes.exact({
    loading: PropTypes.bool.isRequired,
    data: fullOffersTemplate,
    cards: PropTypes.arrayOf(
        PropTypes.exact({
            color: PropTypes.string.isRequired,
            border: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })
    ),
    handleCancel: PropTypes.func.isRequired
}).isRequired;
// #endregion

// #region earnings
const fullEarningsTemplate = PropTypes.exact({
    earnings30d: PropTypes.arrayOf(
        PropTypes.exact({
            amount: PropTypes.number.isRequired,
            mts: PropTypes.number.isRequired
        })
    ),
    earningsList: PropTypes.exact({
        docs: PropTypes.arrayOf(
            PropTypes.exact({
                amount: PropTypes.number.isRequired,
                mts: PropTypes.number.isRequired
            })
        ),
        totalDocs: PropTypes.number.isRequired,
        limit: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        page: PropTypes.number.isRequired,
        pagingCounter: PropTypes.number.isRequired,
        hasPrevPage: PropTypes.bool.isRequired,
        hasNextPage: PropTypes.bool.isRequired,
        prevPage: PropTypes.bool.isRequired,
        nextPage: PropTypes.number.isRequired
    }),
    earningsFull: PropTypes.exact({
        averageAmount: PropTypes.number.isRequired,
        totalSum: PropTypes.number.isRequired,
        totalTime: PropTypes.number.isRequired
    })
}).isRequired;
// #endregion

// #region pages
export const loadingPageTypes = PropTypes.exact({
    loading: PropTypes.bool.isRequired
}).isRequired;

export const layoutPageTypes = PropTypes.exact({
    strategy: fullStrategyTemplate,
    offers: PropTypes.exact({
        open: PropTypes.number.isRequired,
        active: PropTypes.number.isRequired
    }).isRequired,
    earnings: PropTypes.number.isRequired,
    handleLoading: PropTypes.func.isRequired,
    handleCurrent: PropTypes.func.isRequired,
    handleTheme: PropTypes.func.isRequired,
    handleModal: PropTypes.func.isRequired,
    handleTour: PropTypes.func.isRequired
}).isRequired;

export const authPageTypes = PropTypes.exact({
    auth: PropTypes.exact({
        id: PropTypes.string,
        token: PropTypes.string,
        toggle: PropTypes.bool.isRequired
    }).isRequired,
    handleAuth: PropTypes.func.isRequired,
    handleLoading: PropTypes.func.isRequired
}).isRequired;

export const homePageTypes = PropTypes.exact({
    ...fullOffersTemplate,
    ...fullEarningsTemplate
}).isRequired;

export const strategyPageTypes = PropTypes.exact({
    data: fullStrategyTemplate,
    handleLoading: PropTypes.func.isRequired
}).isRequired;

export const offersPageTypes = PropTypes.exact({
    data: fullOffersTemplate,
    handleLoading: PropTypes.func.isRequired
}).isRequired;

export const earningsPageTypes = PropTypes.exact({
    ...fullEarningsTemplate
}).isRequired;

export const settingsPageTypes = PropTypes.exact({
    data: PropTypes.exact({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        api: PropTypes.exact({
            key: PropTypes.string,
            secret: PropTypes.string
        })
    }),
    handleLoading: PropTypes.func.isRequired
}).isRequired;
// #endregion
