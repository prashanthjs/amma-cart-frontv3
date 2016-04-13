export const route = {
    'triangular.admin-default.user': {
        url: '/users',
        templateUrl: 'app/user/views/list.html',
        controller: 'UserListController',
        controllerAs: 'userListController'
    },
    'triangular.admin-default.user-create': {
        url: '/users/create',
        templateUrl: 'app/user/views/form.html',
        controller: 'UserFormController',
        controllerAs: 'userFormController',
        resolve: {
            model: function () {
                return null;
            }
        }
    },
    'triangular.admin-default.user-edit': {
        url: '/users/:id/edit',
        templateUrl: 'app/user/views/form.html',
        controller: 'UserFormController',
        controllerAs: 'userFormController',
        resolve: {
            model: function (userRestService, $stateParams) {
                return userRestService.getById($stateParams.id);
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'Edit'});
                triBreadcrumbsService.addCrumb({name: 'User'});
                return triBreadcrumbsService;
            }
        }
    },
    'triangular.admin-default.user-view': {
        url: '/users/:id/view',
        templateUrl: 'app/user/views/view.html',
        controller: 'UserViewController',
        controllerAs: 'userViewController',
        resolve: {
            model: function (userRestService, $stateParams) {
                return userRestService.getById($stateParams.id);
            },
            images: function (userRestService, $stateParams) {
                return userRestService.getProfilePics($stateParams.id);
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'View'});
                triBreadcrumbsService.addCrumb({name: 'User'});
                return triBreadcrumbsService;
            }
        }
    }

};
