const routes = {
  '/auth': 'Home',
  '/auth/super-admin/dashboard' : 'Dashboard',
  '/auth/super-admin/devices'   : 'Devices',
  '/auth/super-admin/devices/new': 'New Device',
  'auth/super-admin/users/:user_id': 'Edit User',
  '/auth/super-admin/users' : 'Users',
  '/auth/super-admin/users/new': 'New User',
  '/auth/super-admin/settings'  : 'Settings',
  '/auth/admin/exams': 'Exams',
  '/auth/admin/exercises': 'Exercises',
  '/auth/admin/news': 'News',
  '/auth/admin/users': 'Users',
  '/auth/admin/devices': 'Devices',
  '/auth/admin/user-groups': 'User Groups',
  '/auth/admin/settings'  : 'Settings',
  '/auth/admin/videos'  : 'Video Library',
  '/auth/user/settings'  : 'Settings',
  '/auth/user/exams'  : 'Exams',
  '/auth/user/news'  : 'News',
  '/auth/user/videos'  : 'Video Library',
  '/auth/user/statistics'  : 'Statistics'
};
export default routes;
