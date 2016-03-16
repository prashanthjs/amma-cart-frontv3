import {menu} from './menu';
import {route} from './route';
/* @ngInject */
export function Config($stateProvider:angular.ui.IStateProvider, $translatePartialLoaderProvider, triMenuProvider, RestangularProvider) {
    $translatePartialLoaderProvider.addPart('app/whitelabel');

    angular.forEach(route, (route, key) => {
        $stateProvider.state(key, route);
    });

    angular.forEach(menu, (menu) => {
        triMenuProvider.addMenu(menu);
    });

    RestangularProvider.setRequestInterceptor(function (element, operation, route, url) {
        if (operation === 'put' ) {
            delete element.createdAt;
            delete element.updatedAt;
            delete element.internal;
        }
        return element;
    });

}
