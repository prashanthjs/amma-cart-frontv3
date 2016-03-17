import {WhitelabelRestService} from "../services/whitelabel.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class WhitelabelFormController extends AmmaBaseFormController {
    protected restService:WhitelabelRestService;
    public brands;

    /* @ngInject */
    constructor(whitelabelRestService:WhitelabelRestService, $state, $mdToast, model, brands) {
        super($state, $mdToast, model);
        this.brands = brands;
        this.restService = whitelabelRestService;
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('Whitelabel has been created successfully');
        } else {
            this.displaySuccessMessage('Whitelabel has been saved successfully');
        }
        this.$state.go('triangular.admin-default.whitelabel');
    }
}