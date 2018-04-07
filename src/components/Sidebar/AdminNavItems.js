import T from "i18n-react/dist/i18n-react";
import '../../i18n';

export default {
    items: [
        {
            name: 'Dashboard',
            url: '/auth/admin/dashboard',
            icon: 'icon-speedometer',

        },
        {
            name: 'Devices',
            url: '/auth/admin/devices',
            icon: 'icon-camrecorder',

        },
        {
            name: 'User Groups',
            url: '/auth/admin/user-groups',
            icon: 'icon-people',

        },
        {
            name: 'Users',
            url: '/auth/admin/users',
            icon: 'icon-people',

        },
        {
            name: 'Exercises',
            url: '/auth/admin/exercises',
            icon: 'icon-book-open',

        },
        {
            name: 'Exams',
            url: '/auth/admin/exams',
            icon: 'icon-badge',

        },
        {
            name: 'News',
            url: '/auth/admin/news',
            icon: 'icon-bell',

        },
        {
            name: 'Settings',
            url: '/auth/super-admin/settings',
            icon: 'icon-settings',

        },
        {
            name: 'Logout',
            url: '/auth/logout',
            icon: 'icon-logout',

        },
    ]
};
