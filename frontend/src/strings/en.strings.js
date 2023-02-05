const en = {
    auth: {
        signIn: {
            title: 'Welcome',
            email: {
                placeholder: 'Email address',
                required: 'This field is required',
                matches: 'Invalid email address'
            },
            password: {
                placeholder: 'Password',
                required: 'This field is required',
                min: 'Password must be at least 8 characters long',
                matchLowerCase: 'Password must contain a lowercase letter',
                matchUpperCase: 'Password must contain a uppercase letter',
                matchNumber: 'Password must contain a number',
                matchSpecial: 'Password must contain a special character'
            },
            submit: 'Sign in',
            tos: 'Terms of Service',
            policy: 'Privacy Policy',
            signUp: 'Sign up',
            agree: 'By signing in, you agree to the {tos} and {policy}',
            switch: "Don't have an account? {signUp}."
        },
        signUp: {
            title: 'Create Account',
            name: {
                placeholder: 'Username',
                required: 'This field is required',
                min: 'Username must be at least 3 characters long',
                max: 'Maximum length is 30 characters',
                matches: 'Username contains illegal characters'
            },
            email: {
                placeholder: 'Email address',
                required: 'This field is required',
                matches: 'Invalid email address'
            },
            password: {
                placeholder: 'Password',
                required: 'This field is required',
                min: 'Password must be at least 8 characters long',
                match: 'Passwords do not match',
                matchLowerCase: 'Password must contain a lowercase letter',
                matchUpperCase: 'Password must contain a uppercase letter',
                matchNumber: 'Password must contain a number',
                matchSpecial: 'Password must contain a special character'
            },
            submit: 'Sign up',
            tos: 'Terms of Service',
            policy: 'Privacy Policy',
            signIn: 'Sign in',
            agree: 'By signing up, you agree to the {tos} and {policy}',
            switch: 'Already have an account? {signIn}.'
        }
    },
    sidebar: {
        logo: 'MoonBot',
        select: 'Select coin...',
        home: 'Dashboard',
        strategy: 'Strategy',
        offers: 'Offers',
        earnings: 'Earnings',
        settings: 'Settings',
        tour: 'Introduction',
        theme: {
            light: 'Light mode',
            dark: 'Dark mode'
        },
        language: 'Language',
        logout: 'Sign out'
    },
    tour: {
        begin: 'Welcome to Moonbot',
        count: 'Step {step} of {total}',
        steps: [
            // first
            {
                description: 'Do you want to take a short tour?',
                buttons: {
                    cancel: 'Maybe later',
                    start: 'Start'
                }
            },
            // settings
            // api
            {
                description: 'Add API key and secret to connect to the exchange.',
                buttons: {
                    cancel: 'Cancel',
                    back: 'Back',
                    next: 'Next'
                }
            },
            // select
            {
                description: 'Once connected, select a coin from your wallet.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // strategy
            // select
            {
                description: 'Choose a strategy template for the bot.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // infos
            {
                description: 'Check the current minimum amount of an offer.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // manage
            {
                description: 'Configure your strategy based on various metrics.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // activate
            {
                description: 'When you are happy with your settings, activate your strategy.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // offers
            // open
            {
                description: 'Look at the open offers and delete them if necessary.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // active
            {
                description: 'Monitor your active offers and estimated earnings.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // earnings
            // watch
            {
                description: 'Here you get an overview of your earnings, with the option of exporting them.',
                buttons: {
                    back: 'Back',
                    next: 'Next'
                }
            },
            // last
            {
                description: 'If you still have any questions, feel free to contact us.',
                buttons: {
                    close: 'Close'
                }
            }
        ],
        end: 'Thanks!'
    },
    modal: {
        title: 'Change language',
        description: ['Choose a language from the list below.', 'There might be more languages available in the future.'],
        cancel: 'Cancel'
    },
    cards: {
        active: {
            amount: 'Active amount',
            estFees: 'Estimated fees (15%)'
        },
        rates: {
            best: 'Best rate',
            average: 'Average rate',
            lowest: 'Lowest rate'
        },
        estimate: {
            earnings: 'Estimated earnings',
            tomorrow: 'Estimated tomorrow',
            avgPeriod: 'Average period'
        },
        open: {
            available: 'Available amount',
            open: 'Open amount'
        },
        earnings: {
            total: {
                earnings: 'Total earnings',
                fees: 'Total fees (15%)',
                time: 'Total time'
            },
            avgPerDay: 'Average/day'
        },
        home: {
            totalAmount: 'Total amount'
        }
    },
    home: {
        title: 'Overview',
        sections: {
            active: 'Active Offers',
            open: 'Open Offers',
            earnings: 'Earnings'
        }
    },
    strategy: {
        title: 'Strategy',
        select: {
            placeholder: 'Select strategy...',
            list: {
                simple: {
                    label: 'Simple Offer (Beginner)',
                    icon: 'i-[tabler-repeat-once]'
                },
                equal: {
                    label: 'Split Equally (Advanced)',
                    icon: 'i-[tabler-arrows-split-2]'
                },
                pyramid: {
                    label: 'Reverse Pyramid (Expert)',
                    icon: 'i-[vaadin-pyramid-chart] rotate-180'
                }
            }
        },
        active: 'Active',
        inactive: 'Inactive',
        info: {
            note: 'Minimum amount for funding',
            toggle: {
                text: '{toggle} history',
                show: 'Show',
                hide: 'Hide'
            },
            tooltip: {
                fundingProvided: 'Funding (provided)',
                fundingUsed: 'Funding (used)',
                averagePeriod: 'Average period',
                frr: 'Flash return rate'
            }
        },
        simple: {
            title: 'Simple Offer',
            description: ['This strategy creates one offer with the entire balance.', 'You can set limits.'],
            minAmount: {
                label: 'Minimum amount',
                info: 'Minimum amount to lend',
                required: 'This field is required',
                min: 'Minimum amount too low'
            },
            minRate: {
                label: 'Minimum rate',
                info: 'Minimum rate to lend, daily rate (eg. 0.03% / 100)',
                required: 'This field is required',
                min: 'Minimum rate too low'
            },
            minPeriod: {
                label: 'Minimum period',
                info: 'Minimum period to lend',
                required: 'This field is required',
                min: 'Minimum period too low',
                max: 'Minimum period too high'
            },
            save: 'Save changes'
        },
        equal: {
            title: 'Split Equally',
            description: [
                'This strategy splits your available balance in equal offers.',
                'You can set limits and define static mappings.'
            ],
            minAmount: {
                label: 'Minimum amount',
                info: 'Minimum amount to lend',
                required: 'This field is required',
                min: 'Minimum amount too low'
            },
            splitAllIn: {
                label: 'Minimum balance',
                info: 'Below this amount, your balance is not split',
                required: 'This field is required',
                min: 'Minimum balance too low'
            },
            splitUnit: {
                label: 'Split unit',
                info: 'Your balance will be divided into equal parts of this amount',
                required: 'This field is required',
                min: 'Split unit too low'
            },
            overAmount: {
                label: 'Over amount',
                info: 'Get a slightly higher rate by skipping a specific amount in order book',
                required: 'This field is required',
                min: 'Over amount too low'
            },
            periodMap: {
                label: 'Period mapping',
                info: 'Define rate levels and set a period',
                add: 'Add entry',
                remove: 'Delete entry',
                sort: 'The list is sorted automatically by the server.',
                columns: [
                    {
                        title: 'Minimum rate',
                        info: 'Minimum rate to lend, daily rate (eg. 0.03% / 100)'
                    },
                    {
                        title: 'Minimum period',
                        info: 'Minimum period to lend'
                    }
                ],
                required: 'This field is required',
                min: 'Amount too low',
                max: 'Amount too high'
            },
            save: 'Save changes'
        },
        pyramid: {
            title: 'Reverse Pyramid',
            description: [
                'This strategy spreads the offers in a certain range, and the offers are growing with the rate.',
                'You can set limits, define static mappings and dynamic settings.'
            ],
            minAmount: {
                label: 'Minimum amount',
                info: 'Minimum amount to lend',
                required: 'This field is required',
                min: 'Minimum amount too low'
            },
            minRate: {
                label: 'Minimum rate',
                info: 'Minimum rate to lend, daily rate (eg. 0.03% / 100)',
                required: 'This field is required',
                min: 'Minimum rate too low'
            },
            lowBoundRate: {
                label: 'Low bound rate',
                info: 'Minimum lending rate',
                required: 'This field is required',
                min: 'Low bound rate too low'
            },
            upBoundRate: {
                label: 'Up bound rate',
                info: 'Maximum lending rate',
                required: 'This field is required',
                min: 'Up bound rate too low'
            },
            growExponential: {
                label: 'Amount grow exponential',
                info: 'Amount grows with higher rates and longer periods',
                required: 'This field is required',
                min: 'Grow exponential too low'
            },
            overAmount: {
                label: 'Over amount',
                info: 'Get a slightly higher rate by skipping amount in order book',
                required: 'This field is required',
                min: 'Over amount too low'
            },
            skipRemaining: {
                label: 'Skip remaining',
                info: 'Get a slightly higher rate by skipping rates in order book',
                required: 'This field is required',
                min: 'Skip remaining too low'
            },
            rapMap: {
                label: 'Offer mapping',
                info: 'Define rate levels, assign an minimum amount and set a period',
                add: 'Add entry',
                remove: 'Delete entry',
                sort: 'The list is sorted automatically by the server.',
                columns: [
                    {
                        title: 'Minimum rate',
                        info: 'Minimum rate to lend, daily rate (eg. 0.03% / 100)'
                    },
                    {
                        title: 'Minimum amount',
                        info: 'Minimum amount to lend'
                    },
                    {
                        title: 'Minimum period',
                        info: 'Minimum period to lend'
                    }
                ],
                required: 'This field is required',
                min: 'Amount too low',
                max: 'Amount too high'
            },
            save: 'Save changes'
        }
    },
    offers: {
        active: {
            title: 'Active Offers',
            table: {
                loading: 'Loading...',
                empty: 'No active offers',
                columns: ['Amount', 'Rate', 'APY', 'Fees', 'Yield', 'Estimated', 'Expires'],
                exclude: [],
                noMobile: ['APY', 'Fees', 'Yield']
            }
        },
        open: {
            title: 'Open Offers',
            table: {
                loading: 'Loading...',
                empty: 'No open offers',
                columns: ['Amount', 'Rate', 'Period', 'Fees', 'Estimated', 'Created', 'Cancel'],
                exclude: ['Initial', 'Status', 'Type', 'Updated'],
                noMobile: ['Initial', 'Fees'],
                period: 'days',
                cancelOne: 'Cancel',
                cancelAll: 'Cancel all offers'
            }
        }
    },
    earnings: {
        title: 'Earnings',
        info: 'Earnings are updated every 4 hours.',
        chart: {
            title: 'Last 30 days',
            tooltip: { label: 'Profit' }
        },
        table: {
            title: 'Full List',
            settings: {
                export: 'Export',
                entries: 'entries'
            },
            loading: 'Loading...',
            empty: 'No earnings yet',
            end: 'No more entries found',
            columns: ['Date', 'Amount'],
            exclude: [],
            noMobile: []
        }
    },
    settings: {
        title: 'Settings',
        lightbox: {
            title: 'Bitfinex API Key Permissions',
            description: 'These are the permissions required for the bot to function properly.'
        },
        info: {
            connectApi: {
                label: 'How to setup a {link}',
                link: 'Bitfinex API Key'
            },
            permissions: {
                label: 'What are the {link}',
                link: 'required permissions'
            },
            enterData: 'Enter your API key and secret below'
        },
        details: {
            title: 'User Details',
            name: {
                label: 'Username',
                placeholder: 'Username',
                required: 'This field is required',
                min: 'Username must be at least 3 characters long',
                max: 'Maximum length is 30 characters',
                matches: 'Username contains illegal characters'
            },
            email: {
                label: 'Email address',
                placeholder: 'Email address',
                required: 'This field is required',
                matches: 'Invalid email address'
            }
        },
        api: {
            title: 'Bitfinex API',
            key: {
                label: 'API key',
                required: 'This field is required'
            },
            secret: {
                label: 'API secret',
                required: 'This field is required'
            }
        },
        password: {
            title: 'Password',
            current: {
                label: 'Current password',
                required: 'This field is required',
                min: 'Password must be at least 8 characters long',
                matchLowerCase: 'Password must contain a lowercase letter',
                matchUpperCase: 'Password must contain a uppercase letter',
                matchNumber: 'Password must contain a number',
                matchSpecial: 'Password must contain a special character'
            },
            new: {
                label: 'New password',
                required: 'This field is required',
                empty: 'Please enter a new password',
                same: 'You cant set the same password',
                match: 'Passwords do no match',
                min: 'Password must be at least 8 characters long',
                matchLowerCase: 'Password must contain a lowercase letter',
                matchUpperCase: 'Password must contain a uppercase letter',
                matchNumber: 'Password must contain a number',
                matchSpecial: 'Password must contain a special character'
            },
            confirm: {
                label: 'Confirm password',
                required: 'This field is required',
                empty: 'Please enter a new password',
                same: 'You cant set the same password',
                match: 'Passwords do no match',
                min: 'Password must be at least 8 characters long',
                matchLowerCase: 'Password must contain a lowercase letter',
                matchUpperCase: 'Password must contain a uppercase letter',
                matchNumber: 'Password must contain a number',
                matchSpecial: 'Password must contain a special character'
            }
        },
        save: 'Save changes'
    },
    terms: {
        title: 'General Terms and Conditions',
        tagline: 'Last update: 2023/02/01',
        list: [
            {
                title: 'Introduction',
                text: [
                    'These General Terms and Conditions (GTC) apply to the use of the cryptocurrency lending bot (the "Bot") provided by MoonByte (the "Company"). By using the Bot, you agree to be bound by these GTC. If you do not agree to these GTC, you may not use the Bot.'
                ]
            },
            {
                title: 'Description of the Bot',
                text: [
                    'The Bot is an automated system that facilitates lending of cryptocurrency on Bitfinex. The Company does not endorse or guarantee any particular lending transactions that may be conducted through the Bot.'
                ]
            },
            {
                title: 'User Accounts',
                text: [
                    'To use the Bot, you must create an account and provide accurate and complete information as prompted by the registration form. You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.'
                ]
            },
            {
                title: 'Use of the Bot',
                text: [
                    'You may use the Bot for lawful purposes only. You may not use the Bot for any illegal or unauthorized purpose, including but not limited to, money laundering or the financing of terrorism.'
                ]
            },
            {
                title: 'No Warranty',
                text: [
                    'The Bot is provided on an "as is" and "as available" basis. The Company makes no representations or warranties of any kind, express or implied, as to the operation of the Bot or the information, content, materials or products included on the Bot. The Company does not warrant that the Bot will be uninterrupted or error-free, and the Company will not be liable for any interruptions or errors.'
                ]
            },
            {
                title: 'Limitation of Liability',
                text: [
                    'The Company shall not be liable for any damages of any kind arising from the use of the Bot, including but not limited to, direct, indirect, incidental, punitive and consequential damages.'
                ]
            },
            {
                title: 'Indemnification',
                text: [
                    "You agree to indemnify and hold the Company and its affiliates, officers, agents and employees harmless from any claim or demand, including reasonable attorneys' fees, made by any third party due to or arising out of your use of the Bot, your violation of these GTC, or your violation of any rights of another."
                ]
            },
            {
                title: 'Governing Law',
                text: [
                    'These GTC shall be governed by and construed in accordance with the laws of Austria, without giving effect to any principles of conflicts of law.'
                ]
            },
            {
                title: 'Entire Agreement',
                text: [
                    'These GTC constitute the entire agreement between you and the Company with respect to the use of the Bot. If any provision of these GTC is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.'
                ]
            },
            {
                title: 'Changes to GTC',
                text: [
                    'The Company reserves the right to make changes to these GTC at any time without notice. Your continued use of the Bot following any changes to these GTC will be deemed to be your acceptance of such changes.'
                ]
            }
        ]
    },
    privacy: {
        title: 'Privacy Policy',
        tagline: 'Last update: 2023/02/01',
        list: [
            {
                title: 'Introduction',
                text: [
                    'This Privacy Policy explains how MoonByte (the "Company") collects, uses and protects any personal data that you provide to us when you use our cryptocurrency lending bot (the "Bot"). The Company is committed to ensuring that your privacy is protected. Should we ask you to provide certain information by which you can be identified when using the Bot, then you can be assured that it will only be used in accordance with this Privacy Policy.'
                ]
            },
            {
                title: 'Information Collection and Use',
                text: [
                    'The Company collects and uses personal data, such as your name, email address, and IP address, when you create an account or use the Bot. We use this information to provide and improve the Bot, to communicate with you, and to comply with legal and regulatory requirements.'
                ]
            },
            {
                title: 'Cookies',
                text: [
                    'The Bot uses cookies to improve your experience while using the Bot. Cookies are small text files that are placed on your device by the Bot and that store certain information about your use of the Bot. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer.'
                ]
            },
            {
                title: 'Security',
                text: [
                    'The Company is committed to ensuring that your personal data is secure. To prevent unauthorized access or disclosure, we have put in place appropriate physical, electronic and managerial procedures to safeguard and secure the information we collect.'
                ]
            },
            {
                title: 'Third-Party Websites',
                text: [
                    'The Bot may contain links to other websites. The Company is not responsible for the privacy practices of these other websites. You should exercise caution and look at the privacy statement applicable to the website in question.'
                ]
            },
            {
                title: 'Changes to this Privacy Policy',
                text: [
                    'The Company reserves the right to make changes to this Privacy Policy at any time without notice. Your continued use of the Bot following any changes to this Privacy Policy will be deemed to be your acceptance of such changes.'
                ]
            },
            {
                title: 'Contact Us',
                text: ['If you have any questions about this Privacy Policy, please contact us at support@moonbot.org.']
            }
        ]
    },
    legal: {
        title: 'Legal Disclaimer',
        tagline: 'Last update: 2023/02/01',
        list: [
            {
                title: '',
                text: [
                    'The information contained in this website is for general information purposes only. The information is provided by MoonByte and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.',
                    'In no event will we be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.',
                    'Through this website you are able to link to other websites which are not under the control of MoonByte. We have no control over the nature, content and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.',
                    'Every effort is made to keep the website up and running smoothly. However, MoonByte takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.'
                ]
            },
            {
                title: 'Copyright Notice',
                text: [
                    'This website and its content is copyright of MoonByte - © MoonByte 2023. All rights reserved.',
                    'Any redistribution or reproduction of part or all of the contents in any form is prohibited other than the following:',
                    'You may copy the content to individual third parties for their personal use, but only if you acknowledge the website as the source of the material',
                    'You may not, except with our express written permission, distribute or commercially exploit the content. Nor may you transmit it or store it in any other website or other form of electronic retrieval system.'
                ]
            }
        ]
    },
    error: {
        title: '404',
        tagline: 'Page Not Found',
        button: 'Home'
    },
    toasts: {
        unknown: 'Internal error',
        forbidden: '403 Forbidden',
        successfulAuth: 'Authentication successful',
        apiClientError: 'Connection to API failed',
        dbError: 'Failed to connect to database',
        failedBackend: 'Backend not reachable',
        invalidCharsUsername: 'Username contains illegal characters',
        minCharsUsername: 'Username must be at least 3 characters long',
        maxCharsUsername: 'Maximum length is 30 characters',
        invalidEmail: 'Email not valid',
        requiredPwCurrent: 'Current password is required',
        invalidPwCurrent: 'Current password is invalid',
        emptyPassword: 'Please enter a new password',
        samePassword: 'You cant set the same password',
        noMatchPassword: 'Passwords do no match',
        minCharsPwCurrent: 'Current password must be at least 8 characters long',
        lowerCasePwCurrent: 'Current password must contain a lowercase letter',
        upperCasePwCurrent: 'Current password must contain a uppercase letter',
        numberPwCurrent: 'Current password must contain a number',
        specialCharPwCurrent: 'Current password must contain a special character',
        minCharsNewPassword: 'New password must be at least 8 characters long',
        lowerCaseNewPassword: 'New password must contain a lowercase letter',
        upperCaseNewPassword: 'New password must contain a uppercase letter',
        numberNewPassword: 'New password must contain a number',
        specialCharNewPassword: 'New password must contain a special character',
        wrongEmailPassword: 'Wrong email or password',
        invalidApiKeySecret: 'Invalid key or secret',
        invalidApiKeyPermissions: 'Invalid key permissions',
        notAvailableCoin: 'Coin not available',
        notAvailableUser: 'User not available',
        savedChanges: 'Changes saved',
        noChanges: 'No changes made',
        lowMinAmount: 'Minimum amount too low',
        lowMinRate: 'Minimum rate too low',
        lowMinPeriod: 'Minimum period too low',
        lowSplitAllIn: 'Minimum balance too low',
        lowSplitUnit: 'Split unit too low',
        lowOverAmount: 'Over amount too low',
        lowLowBoundRate: 'Low bound rate too low',
        lowUpBoundRate: 'Up bound too low',
        lowGrowExponential: 'Grow exponential too low',
        lowSkipRemaining: 'Skip remaining too low',
        maxOfferMap: 'Offer mapping maximum 10 entries',
        lowOfferMapRate: 'Offer mapping rate too low',
        lowOfferMapAmount: 'Offer mapping amount too low',
        lowOfferMapPeriod: 'Offer mapping period too low',
        highOfferMapPeriod: 'Offer mapping period too high',
        successCancelAllOffers: 'All offers were successfully cancelled.',
        errorCancelAllOffers: 'There was an error cancelling the offers',
        successCancelOneOffer: 'The offer was successfully cancelled.',
        errorCancelOneOffer: 'There was an error cancelling the offer'
    }
};

export default en;
