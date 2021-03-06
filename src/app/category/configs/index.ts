import {menu} from './menu';
import {route} from './route';
/* @ngInject */
export function Config($stateProvider:angular.ui.IStateProvider, $translatePartialLoaderProvider, triMenuProvider) {
    $translatePartialLoaderProvider.addPart('app/category');

    angular.forEach(route, (route, key) => {
        $stateProvider.state(key, route);
    });

    angular.forEach(menu, (menu) => {
        triMenuProvider.addMenu(menu);
    });

}
