import {UserGridService} from "../services/user.grid.service";
import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseListController} from "../../amma-util/controller/amma.base.list.controller";

export class UserListController extends AmmaBaseListController {

    protected restService:UserRestService;

    /* @ngInject */
    constructor(userGridService:UserGridService, userRestService:UserRestService, $mdToast, $mdDialog, $state) {
        super($mdToast, $mdDialog, $state);
        this.gridOptions = userGridService.gridOptions;
        this.restService = userRestService;
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete the User ' + dataItem._id + ' ?';
    }

    changePassword(dataItem, ev){
        this.$mdDialog.show({
                controller: 'UserChangePasswordFormController',
                controllerAs: 'userChangePasswordFormController',
                templateUrl: 'app/user/views/change-password.form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    id: dataItem ._id
                },
                clickOutsideToClose: false
            })
            .then(() => {

            }, () => {

            });
    }
}


