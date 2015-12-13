import {menus} from './configs/menus';
import {routes} from './configs/routes';
/* @ngInject */
export function UserConfig($stateProvider: angular.ui.IStateProvider, $translatePartialLoaderProvider, triMenuProvider) {
  $translatePartialLoaderProvider.addPart('app/user');

  angular.forEach(routes, (route, key) => {
    $stateProvider.state(key, route);
  });


  angular.forEach(menus, (menu) => {
    triMenuProvider.addMenu(menu);
  });
}
