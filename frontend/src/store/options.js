const options = {
    auth: {
        id: null,
        token: null,
        toggle: true
    },
    user: {
        name: '',
        email: '',
        api: {
            key: '',
            secret: ''
        }
    },
    account: {
        coins: [],
        currency: '',
        balance: 0,
        availableBalance: 0,
        timestamp: null,
        funding: [],
        lending: []
    },
    stats: {
        ask: 0,
        bid: 0,
        min: 0,
        history: []
    },
    strategy: {
        _id: '',
        currency: 'UST',
        active: 'none',
        select: 'simple',
        types: {
            simple: {
                minAmount: 0,
                minRate: 0,
                minPeriod: 2
            },
            equal: {
                minAmount: 0,
                splitAllIn: 0,
                splitUnit: 0,
                overAmount: 0,
                periodMap: [[0.0001, 2]]
            },
            pyramid: {
                minAmount: 0,
                minRate: 0,
                lowBoundRate: 0,
                upBoundRate: 0,
                growExponential: 0,
                overAmount: 0,
                skipRemaining: 0,
                rapMap: [[0.0001, 150, 2]]
            }
        }
    },
    earnings: {
        earnings30d: [],
        earningsList: {},
        earningsFull: {
            averageAmount: 0,
            totalSum: 0,
            totalTime: 0
        }
    },
    home: {
        activeCards: true,
        openCards: true,
        earnCards: true
    },
    coins: [],
    current: '',
    toast: {
        type: '',
        value: false
    },
    tour: {
        active: true,
        manual: false,
        step: 0
    },
    theme: 'light',
    language: 'en',
    modal: false,
    loading: false,
    lightbox: false,
    collapse: false,
    update: false,
    init: false
};

export default options;
