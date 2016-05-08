import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class UserFormController extends AmmaBaseFormController {
    protected restService:UserRestService;
    public maxDob;
    public roles;
    public stores;

    /* @ngInject */
    constructor(userRestService:UserRestService, $state, $mdToast, model, roles, stores) {
        if (model && model.dob) {
            model.dob = new Date(model.dob);
        }

        super($state, $mdToast, model);
        this.restService = userRestService;
        this.maxDob = new Date();
        this.roles = roles;
        this.stores = stores;
        if(this.isNew){
            this.model.isActive = true;
            this.model.dob = new Date();
        }
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('User has been created successfully');
        } else {
            this.displaySuccessMessage('User has been saved successfully');
        }
        this.$state.go('amma.admin-default.user');
    }
}