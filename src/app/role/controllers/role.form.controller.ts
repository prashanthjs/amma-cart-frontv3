import {RoleRestService} from "../services/role.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class RoleFormController extends AmmaBaseFormController {
    protected restService:RoleRestService;
    public $scope;
    public privileges;
    private $mdDialog;

    /* @ngInject */
    constructor(roleRestService:RoleRestService, $state, $mdToast, model, $scope, privileges, $mdDialog) {
        super($state, $mdToast, model);
        this.restService = roleRestService;
        this.$scope = $scope;
        this.privileges = privileges.result;
        this.$mdDialog = $mdDialog;
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('Role has been created successfully');
        } else {
            this.displaySuccessMessage('Role has been saved successfully');
        }

        this.$mdDialog.hide();

    }

    cancel(){

        this.$mdDialog.cancel();
    }

    togglePrivilege(privilege) {

        if(!this.model.privileges){
            this.model['privileges'] = [];
        }
        var idx = this.model.privileges.indexOf(privilege);

        // is currently selected
        if (idx > -1) {
            this.model.privileges.splice(idx, 1);
        }

        // is newly selected
        else {
            this.model.privileges.push(privilege);
        }
    };
}