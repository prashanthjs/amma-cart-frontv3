import {CategoryRestService} from "../services/category.rest.service";
import {AmmaBaseFormController} from "../../amma-util/controller/amma.base.form.controller";
export class CategoryFormController extends AmmaBaseFormController {
    protected restService:CategoryRestService;
    public categories;

    /* @ngInject */
    constructor(categoryRestService:CategoryRestService, $state, $mdToast, model, categories) {
        super($state, $mdToast, model);
        this.categories = categories;
        this.restService = categoryRestService;
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('Category has been created successfully');
        } else {
            this.displaySuccessMessage('Category has been saved successfully');
        }
        this.$state.go('amma.admin-default.category');
    }
}