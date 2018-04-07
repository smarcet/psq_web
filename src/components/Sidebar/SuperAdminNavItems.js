import T from "i18n-react/dist/i18n-react";
import '../../i18n';

export default {
  items: [
    {
      name: T.translate("superAdmin.sideBar.navLinks.dashboard"),
      url: '/auth/super-admin/dashboard',
      icon: 'icon-speedometer',

    },
    {
        name: T.translate("superAdmin.sideBar.navLinks.devices"),
        url: '/auth/super-admin/devices',
        icon: 'icon-camrecorder',

    },
      {
          name: T.translate("superAdmin.sideBar.navLinks.adminUsers"),
          url: '/auth/super-admin/admin-users',
          icon: 'icon-people',

      },
      {
          name: T.translate("superAdmin.sideBar.navLinks.settings"),
          url: '/auth/super-admin/settings',
          icon: 'icon-settings',

      },
      {
          name: T.translate("superAdmin.sideBar.navLinks.logout"),
          url: '/auth/logout',
          icon: 'icon-logout',

      },
  ]
};
