export const route = {
    'triangular.admin-default.store': {
        url: '/stores',
        templateUrl: 'app/store/views/list.html',
        controller: 'StoreListController',
        controllerAs: 'storeListController'
    },
    'triangular.admin-default.store-create': {
        url: '/stores/create',
        templateUrl: 'app/store/views/form.html',
        controller: 'StoreFormController',
        controllerAs: 'storeFormController',
        resolve: {
            model: function () {
                return null;
            },
            brands: function (storeRestService) {
                return storeRestService.getList();
            }
        }
    },
    'triangular.admin-default.store-edit': {
        url: '/stores/:id/edit',
        templateUrl: 'app/store/views/form.html',
        controller: 'StoreFormController',
        controllerAs: 'storeFormController',
        resolve: {
            model: function (storeRestService, $stateParams) {
                return storeRestService.getById($stateParams.id);
            },
            brands: function (storeRestService) {
                return storeRestService.getList();
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'Edit'});
                triBreadcrumbsService.addCrumb({name: 'Store'});
                return triBreadcrumbsService;
            }
        }
    },
    'triangular.admin-default.store-view': {
        url: '/stores/:id/view',
        templateUrl: 'app/store/views/view.html',
        controller: 'StoreViewController',
        controllerAs: 'storeViewController',
        resolve: {
            model: function (storeRestService, $stateParams) {
                return storeRestService.getById($stateParams.id);
            },
            images: function (storeRestService, $stateParams) {
                return storeRestService.getImages($stateParams.id);
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'View'});
                triBreadcrumbsService.addCrumb({name: 'Store'});
                return triBreadcrumbsService;
            }
        }
    }

};
