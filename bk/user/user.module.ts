import {UserConfig} from './user.config';
import {UserMainController} from './controllers/user.main.controller';
import {UserCreateController} from './controllers/user.create.controller';
import {UserTestController} from './controllers/user.test.controller';

import {UserGridService} from './services/user.grid.service';
import {UserRestService} from './services/user.rest.service';
import {AmmaEventEmitterService} from './services/amma.event.emitter.service';


export module User {
  angular
    .module('user', ['kendo.directives', 'restangular', 'amma.util'])
    .config(UserConfig)
    .controller('UserMainController', UserMainController)
    .controller('UserTestController', UserTestController)
    .controller('UserCreateController', UserCreateController)
    .service('UserGridService', UserGridService)
    .service('AmmaEventEmitterService', AmmaEventEmitterService)
    .factory('UserRestService', function(Restangular) {
      console.log(Restangular.all('users'));
      return Restangular.service('users');
    });

}
