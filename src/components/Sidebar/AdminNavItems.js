import T from "i18n-react/dist/i18n-react";
import '../../i18n';

export default {
    items: [
        {
            name: T.translate("admin.sideBar.navLinks.dashboard"),
            url: '/auth/admin/dashboard',
            icon: 'icon-speedometer',

        },
        {
            name: T.translate("admin.sideBar.navLinks.devices"),
            url: '/auth/admin/devices',
            icon: 'icon-camrecorder',

        },
        {
            name:  T.translate("admin.sideBar.navLinks.userGroups"),
            url: '/auth/admin/user-groups',
            icon: 'icon-people',

        },
        {
            name: T.translate("admin.sideBar.navLinks.users"),
            url: '/auth/admin/users',
            icon: 'icon-people',

        },
        {
            name: T.translate("admin.sideBar.navLinks.exercises"),
            url: '/auth/admin/exercises',
            icon: 'icon-book-open',

        },
        {
            name: T.translate("admin.sideBar.navLinks.exams"),
            url: '/auth/admin/exams',
            icon: 'icon-badge',

        },
        {
            name: T.translate("admin.sideBar.navLinks.news"),
            url: '/auth/admin/news',
            icon: 'icon-bell',

        },
        {
            name: T.translate("admin.sideBar.navLinks.settings"),
            url: '/auth/super-admin/settings',
            icon: 'icon-settings',

        },
        {
            name: T.translate("admin.sideBar.navLinks.logout"),
            url: '/auth/logout',
            icon: 'icon-logout',

        },
    ]
};
