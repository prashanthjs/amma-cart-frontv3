/* @ngInject */

export function AmmaUserConfig($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
  $translatePartialLoaderProvider.addPart('app/amma-user');




  $stateProvider
    .state('triangular.admin-default.amma-user', {
      abstract: true,
      url: '/amma-user/grid/{userId:int}',
      params: {
        userId: {value: null, squash: true}
      },
      templateUrl: 'app/amma-user/views/amma-user.grid.tmpl.html',
      controller: function ($scope, $rootScope) {
        $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
          $scope.currentTab = toState.data.selectedTab;
        });
        var tabs = {};
        $rootScope.$emit('get-tabs',{
          tabs: tabs
        });
        console.log(tabs);
      }
    })
    .state('triangular.admin-default.amma-user.player', {
      url: '/player',
      data: {
        'selectedTab': 0
      },
      views: {
        'player': {
          template:'{{message}}',
          controller: function($scope){
            $scope.message = 'test';
          }
        }
      }
    })
    .state('triangular.admin-default.amma-user.map', {
      url: '/map',
      data: {
        'selectedTab': 1
      },
      views: {
        'map': {
          template:'{{message}}',
          controller: function($scope){
            $scope.message = 'map';
          }
        }
      }
    });


  triMenuProvider.addMenu({
    name: 'MENU.USER.USER-MODULE',
    icon: 'zmdi zmdi-home',
    type: 'dropdown',
    priority: 1.1,
    children: [{
      name: 'MENU.USER.USER-MODULE',
      state: 'triangular.admin-default.amma-user',
      type: 'link'
    }]
  });

}
