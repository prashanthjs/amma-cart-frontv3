export const route = {
    'amma.admin-default.category': {
        url: '/categories',
        templateUrl: 'app/category/views/list.html',
        controller: 'CategoryListController',
        controllerAs: 'categoryListController'
    },
    'amma.admin-default.category-create': {
        url: '/categories/create',
        templateUrl: 'app/category/views/form.html',
        controller: 'CategoryFormController',
        controllerAs: 'categoryFormController',
        resolve: {
            model: function () {
                return null;
            },
            categories: function (categoryRestService) {
                return categoryRestService.getList();
            }
        }
    },
    'amma.admin-default.category-edit': {
        url: '/categories/:id/edit',
        templateUrl: 'app/category/views/form.html',
        controller: 'CategoryFormController',
        controllerAs: 'categoryFormController',
        resolve: {
            model: function (categoryRestService, $stateParams) {
                return categoryRestService.getById($stateParams.id);
            },
            categories: function (categoryRestService) {
                return categoryRestService.getList();
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'Edit'});
                triBreadcrumbsService.addCrumb({name: 'Category'});
                return triBreadcrumbsService;
            }
        }
    },
    'amma.admin-default.category-view': {
        url: '/categories/:id/view',
        templateUrl: 'app/category/views/view.html',
        controller: 'CategoryViewController',
        controllerAs: 'categoryViewController',
        resolve: {
            model: function (categoryRestService, $stateParams) {
                return categoryRestService.getById($stateParams.id);
            },
            images: function (categoryRestService, $stateParams) {
                return categoryRestService.getImages($stateParams.id);
            },
            breadCrumbs: function (triBreadcrumbsService, $stateParams) {
                triBreadcrumbsService.reset();
                triBreadcrumbsService.addCrumb({name: $stateParams.id});
                triBreadcrumbsService.addCrumb({name: 'View'});
                triBreadcrumbsService.addCrumb({name: 'Category'});
                return triBreadcrumbsService;
            }
        }
    }

};
