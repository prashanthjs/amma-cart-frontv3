import {StoreRestService} from "../services/store.rest.service";
import {AmmaBaseViewController} from "../../amma-util/controller/amma.base.view.controller";

export class StoreViewController extends AmmaBaseViewController {
    public imageUrl = '/stores/images/';

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG, images) {
        super(model, $mdDialog, $mdToast, API_CONFIG);
        this.images = images.files;
    }
}