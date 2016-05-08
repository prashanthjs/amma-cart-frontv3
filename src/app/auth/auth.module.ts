import {Config} from './configs/index';
import {AuthLoginController} from "./controllers/auth.login.controller";
import {AuthLogoutController} from "./controllers/auth.logout.controller";
import {AuthRestService} from "./services/auth.rest.service";
import {AuthService} from "./services/auth.service";

export module Auth {
    angular
        .module('auth', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('AuthLoginController', AuthLoginController)
        .controller('AuthLogoutController', AuthLogoutController)
        .service('authRestService', AuthRestService)
        .service('authService', AuthService)
        .run((authService:AuthService, $location)=> {
            authService.updateRestAuthHeader();
            if(!authService.getToken()){
                $location.path('/login');
            }
        });

}
