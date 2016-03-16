export const route = {
    'triangular.admin-default.whitelabel': {
        url: '/whitelabels',
        templateUrl: 'app/whitelabel/views/list.html',
        controller: 'WhitelabelListController',
        controllerAs: 'whitelabelListController'
    },
    'triangular.admin-default.whitelabel-create': {
        url: '/whitelabels/create',
        templateUrl: 'app/whitelabel/views/form.html',
        controller: 'WhitelabelFormController',
        controllerAs: 'whitelabelFormController',
        resolve: {
            model: function () {
                return null;
            },
            brands: function (whitelabelRestService) {
                return whitelabelRestService.getList();
            }
        }
    },
    'triangular.admin-default.whitelabel-edit': {
        url: '/whitelabels/:id/edit',
        templateUrl: 'app/whitelabel/views/form.html',
        controller: 'WhitelabelFormController',
        controllerAs: 'whitelabelFormController',
        resolve: {
            model: function (whitelabelRestService, $stateParams) {
                return whitelabelRestService.getById($stateParams.id);
            },
            brands: function (whitelabelRestService) {
                return whitelabelRestService.getList();
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'Edit'});
                triBreadcrumbsService.addCrumb({name: 'Whitelabel'});
                return triBreadcrumbsService;
            }
        }
    },
    'triangular.admin-default.whitelabel-view': {
        url: '/whitelabels/:id/view',
        templateUrl: 'app/whitelabel/views/view.html',
        controller: 'WhitelabelViewController',
        controllerAs: 'whitelabelViewController',
        resolve: {
            model: function (whitelabelRestService, $stateParams) {
                return whitelabelRestService.getById($stateParams.id);
            },
            images: function (whitelabelRestService, $stateParams) {
                return whitelabelRestService.getLogos($stateParams.id);
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'View'});
                triBreadcrumbsService.addCrumb({name: 'Whitelabel'});
                return triBreadcrumbsService;
            }
        }
    }

};
