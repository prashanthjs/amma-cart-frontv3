export var routes = {
  'triangular.admin-default.user': {
    url: '/users',
    templateUrl: 'app/user/views/user.index.html',
    controller: 'UserIndexController',
    controllerAs: 'userIndexController'
  },
  'triangular.admin-default.user-view': {
    url: '/users/view',
    templateUrl: 'app/user/views/user.view.html',
    controller: 'UserViewController',
    controllerAs: 'userViewController'
  },
  'triangular.admin-default.user-create': {
    url: '/users/create',
    templateUrl: 'app/user/views/user.create.html',
    controller: 'UserCreateController',
    controllerAs: 'userCreateController'
  }
};
