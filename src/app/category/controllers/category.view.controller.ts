import {CategoryRestService} from "../services/category.rest.service";
import {AmmaBaseViewController} from "../../amma-util/controller/amma.base.view.controller";

export class CategoryViewController extends AmmaBaseViewController {
    public imageUrl = '/categories/images/';

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG, images) {
        super(model, $mdDialog, $mdToast, API_CONFIG);
        this.images = images.files;
    }
}