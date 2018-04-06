const routes = {
  '/auth': 'Home',
  '/auth/super-admin/dashboard' : 'Dashboard',
  '/auth/super-admin/devices'   : 'Devices',
  '/auth/super-admin/devices/new': 'New Device',
  'auth/super-admin/admin-users/:user_id': 'Edit User',
  '/auth/super-admin/admin-users' : 'Admin Users',
  '/auth/super-admin/admin-users/new': 'New Admin User',
  '/auth/super-admin/settings'  : 'Settings',
  '/auth/admin/exams': 'Exams',
  '/auth/admin/exercises': 'Exercises',
  '/auth/admin/news': 'News',
  '/auth/admin/users': 'Users',
  '/auth/admin/devices': 'Devices',
  '/auth/admin/user-groups': 'User Groups',
  '/auth/admin/settings'  : 'Settings',

  '/auth/user/settings'  : 'Settings',
  '/auth/user/exams'  : 'Exams',
  '/auth/user/videos'  : 'Video Library',
  '/auth/user/statistics'  : 'Statistics'
};
export default routes;
