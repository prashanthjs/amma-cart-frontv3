import {RoleGridService} from "../services/role.grid.service";
import {RoleRestService} from "../services/role.rest.service";
import {AmmaBaseListController} from "../../amma-util/controller/amma.base.list.controller";

export class RoleListController extends AmmaBaseListController {

    protected restService:RoleRestService;

    /* @ngInject */
    constructor(roleGridService:RoleGridService, roleRestService:RoleRestService, $mdToast, $mdDialog, $state) {
        super($mdToast, $mdDialog, $state);
        this.gridOptions = roleGridService.gridOptions;
        this.restService = roleRestService;
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete the Role ' + dataItem._id + ' ?';
    }

    openForm(dataItem, ev) {
        this.$mdDialog.show({
                controller: 'RoleFormController',
                controllerAs: 'roleFormController',
                templateUrl: 'app/role/views/form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    model: dataItem ? this.restService.getById(dataItem._id) : null,
                    privileges: this.restService.getAllPrivileges()
                },
                clickOutsideToClose: false
            })
            .then(() => {
                this.grid.dataSource.read();
            }, () => {
              //  this.grid.dataSource.read();
            });
    }
}


