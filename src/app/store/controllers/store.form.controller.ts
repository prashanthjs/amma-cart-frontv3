import {StoreRestService} from "../services/store.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class StoreFormController extends AmmaBaseFormController {
    protected restService:StoreRestService;
    public brands;

    /* @ngInject */
    constructor(storeRestService:StoreRestService, $state, $mdToast, model, brands) {
        super($state, $mdToast, model);
        this.brands = brands;
        this.restService = storeRestService;
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('Store has been created successfully');
        } else {
            this.displaySuccessMessage('Store has been saved successfully');
        }
        this.$state.go('triangular.admin-default.store');
    }
}