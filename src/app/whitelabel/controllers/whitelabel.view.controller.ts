import {WhitelabelRestService} from "../services/whitelabel.rest.service";
import {AmmaBaseViewController} from "../../amma-util/controller/amma.base.view.controller";

export class WhitelabelViewController extends AmmaBaseViewController {
    public imageUrl = '/whitelabels/logo/get/';

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG, images) {
        super(model, $mdDialog, $mdToast, API_CONFIG);
        this.images = images.files;
    }
}