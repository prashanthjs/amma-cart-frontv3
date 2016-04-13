import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseViewController} from "../../amma-util/controller/amma.base.view.controller";

export class UserViewController extends AmmaBaseViewController {
    public imageUrl = '/users/profile-pic-images/';

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG, images) {
        super(model, $mdDialog, $mdToast, API_CONFIG);
        this.images = images.files;
    }
}