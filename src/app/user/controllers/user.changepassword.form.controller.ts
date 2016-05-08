import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class UserChangePasswordFormController extends AmmaBaseFormController {
    protected restService:UserRestService;
    private $mdDialog;

    /* @ngInject */
    constructor(userRestService:UserRestService, $state, $mdToast, id, $mdDialog) {
        const model = {_id: id};
        this.$mdDialog = $mdDialog;
        super($state, $mdToast, model);
        this.restService = userRestService;
    }

    submit() {
        this.restService.updatePassword(this.model._id, this.model.password).then((response)=> {
            this.model = response;
            this.displaySuccessMessage('Successfully updated password');
            this.$mdDialog.hide();
        }, (error:any)=> {
            this.displayErrorMessage(error);
        });
    }

    cancel() {
        this.$mdDialog.cancel();
    }
}