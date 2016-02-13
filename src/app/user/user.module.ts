import {UserConfig} from './user.config';
import {UserIndexController} from './controllers/user.index.controller';
import {UserViewController} from './controllers/user.view.controller';
import {UserGridService} from './services/user.grid.service';
import {UserRestService} from './services/user.rest.service';
import {AmmaEventEmitterService} from './services/amma.event.emitter.service';


export module User {
    angular
        .module('user', ['kendo.directives', 'restangular', 'amma.util'])
        .config(UserConfig)
        .controller('UserIndexController', UserIndexController)
        .controller('UserViewController', UserViewController)
        .service('UserGridService', UserGridService)
        .service('AmmaEventEmitterService', AmmaEventEmitterService)
        .factory('UserRestService', function (Restangular) {
            console.log(Restangular.all('users'));
            return Restangular.service('users');
        });

}
