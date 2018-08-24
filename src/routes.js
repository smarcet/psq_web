import T from 'i18n-react';

const routes = {
  '/auth': 'Home',
  '/auth/super-admin/dashboard' : T.translate('Dashboard'),
  '/auth/super-admin/devices'   : T.translate('Devices'),
  '/auth/super-admin/devices/new': T.translate('New Device'),
  'auth/super-admin/users/:user_id': T.translate('Edit User'),
  '/auth/super-admin/users' : T.translate('Users'),
  '/auth/super-admin/users/new': T.translate('New User'),
  '/auth/super-admin/settings'  : T.translate('Settings'),
  '/auth/admin/exams': T.translate('Exams'),
  '/auth/admin/exercises': T.translate('Exercises'),
  '/auth/admin/news': T.translate('News'),
  '/auth/admin/statistics'  : T.translate('Statistics'),
  '/auth/admin/users': T.translate('Users'),
  '/auth/admin/devices': T.translate('Devices'),
  '/auth/admin/user-groups': T.translate('User Groups'),
  '/auth/admin/settings'  : T.translate('Settings'),
  '/auth/admin/videos'  : T.translate('Video Library'),
  '/auth/user/settings'  : T.translate('Settings'),
  '/auth/user/exams'  : T.translate('Exams'),
  '/auth/user/exercises'  : T.translate('Available Exercises'),
  '/auth/user/exercises/:exercise_ud'  : T.translate('View Exercise'),
  '/auth/user/news'  : T.translate('News'),
  '/auth/user/videos'  : T.translate('Video Library'),
  '/auth/user/statistics'  : T.translate('Statistics'),
};
export default routes;
