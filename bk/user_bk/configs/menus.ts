export var menus = [
  {
    name: 'MENU.USER.USER-MODULE',
    icon: 'zmdi zmdi-home',
    type: 'dropdown',
    priority: 1.1,
    children: [{
      name: 'MENU.USER.MANAGE-USERS',
      state: 'triangular.admin-default.user',
      type: 'link'
    }]
  }
];
