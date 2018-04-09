import T from "i18n-react/dist/i18n-react";
import '../../i18n';

export default {
    items: [
        {
            name: T.translate("user.sideBar.navLinks.dashboard"),
            url: '/auth/user/dashboard',
            icon: 'icon-speedometer',

        },
        {
            name: T.translate("user.sideBar.navLinks.exercises"),
            url: '/auth/user/exercises',
            icon: 'icon-book-open',

        },
        {
            name: T.translate("user.sideBar.navLinks.exams"),
            url: '/auth/user/exams',
            icon: 'icon-badge',

        },
        {
            name: T.translate("user.sideBar.navLinks.statistics"),
            url: '/auth/user/statistics',
            icon: 'icon-graph',

        },
        {
            name: T.translate("user.sideBar.navLinks.videos"),
            url: '/auth/user/videos',
            icon: 'icon-camrecorder',

        },
        {
            name: T.translate("user.sideBar.navLinks.settings"),
            url: '/auth/user/settings',
            icon: 'icon-settings',

        },
        {
            name: T.translate("user.sideBar.navLinks.logout"),
            url: '/auth/logout',
            icon: 'icon-logout',
        }
    ]
};
