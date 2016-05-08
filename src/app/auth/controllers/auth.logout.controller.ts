import {AmmaBaseController} from "../../amma-util/controller/amma.base.controller";
export class AuthLogoutController extends AmmaBaseController {

    /* @ngInject */
    constructor(authService, $mdToast, $location) {
        super($mdToast);
        authService.logout().then(()=>{
            $location.path('/login');
        });

    }
}