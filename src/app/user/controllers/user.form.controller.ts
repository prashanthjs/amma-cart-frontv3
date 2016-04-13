import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class UserFormController extends AmmaBaseFormController {
    protected restService:UserRestService;
    public maxDob;

    /* @ngInject */
    constructor(userRestService:UserRestService, $state, $mdToast, model) {
        if (model && model.dob) {
            model.dob = new Date(model.dob);
        }
        super($state, $mdToast, model);
        this.restService = userRestService;
        this.maxDob = new Date();
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('User has been created successfully');
        } else {
            this.displaySuccessMessage('User has been saved successfully');
        }
        this.$state.go('triangular.admin-default.user');
    }
}