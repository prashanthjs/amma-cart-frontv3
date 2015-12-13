import {AmmaUserConfig} from './amma-user.config';
import {AmmaUserGridController} from "./controllers/amma-user.grid.controller";
export module AmmaUser {
  angular
    .module('amma.user', ['kendo.directives', 'restangular'])
    .config(AmmaUserConfig)
    .controller('AmmaUserGridController', AmmaUserGridController)
    .run(function($rootScope){
      $rootScope.$on('get-tabs',function(event,data){
        data.tabs['test'] = 'test123';
      });

    });
}
