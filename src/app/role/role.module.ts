import {Config} from './configs/index';
import {RoleRestService} from "./services/role.rest.service";
import {RoleGridService} from "./services/role.grid.service";
import {RoleFormController} from "./controllers/role.form.controller";
import {RoleListController} from "./controllers/role.list.controller";
export module Role {
    angular
        .module('role', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('RoleListController', RoleListController)
        .controller('RoleFormController', RoleFormController)
        .service('roleGridService', RoleGridService)
        .service('roleRestService', RoleRestService);

}
