// functions
import formatNumber from 'src/functions/formatNumber';

// strings
import strings from 'src/strings';

const sidebarList = (strategy, offers, earnings, current) => {
    const text = strings.sidebar;

    return [
        {
            icon: 'i-[mdi-view-dashboard-outline]',
            name: text.home,
            to: '/'
        },
        {
            icon: 'i-[ph-strategy-duotone]',
            name: text.strategy,
            to: '/strategy',
            badge: strategy
        },
        {
            icon: 'i-[mdi-format-list-group]',
            name: text.offers,
            to: '/offers',
            badge: offers
        },
        {
            icon: 'i-[tabler-pig-money]',
            name: text.earnings,
            to: '/earnings',
            badge: { sum: formatNumber(earnings) }
            // badge: `${formatNumber(earnings)} ${current}`
        },
        {
            icon: 'i-[mdi-cog-outline]',
            name: text.settings,
            to: '/settings'
        }
    ];
};

export default sidebarList;
