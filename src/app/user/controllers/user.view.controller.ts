import {UserRestService} from "../services/user.rest.service";
import {AmmaBaseViewController} from "../../amma-util/controller/amma.base.view.controller";

export class UserViewController extends AmmaBaseViewController {
    public imageUrl;

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG, images, USER_IMAGE_BASE_PATH) {
        super(model, $mdDialog, $mdToast, API_CONFIG);
        this.images = images.files;
        this.imageUrl = USER_IMAGE_BASE_PATH;
    }

    changePassword( ev){
        this.$mdDialog.show({
                controller: 'UserChangePasswordFormController',
                controllerAs: 'userChangePasswordFormController',
                templateUrl: 'app/user/views/change-password.form.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                locals: {
                    id: this.model._id
                },
                clickOutsideToClose: false
            })
            .then(() => {

            }, () => {

            });
    }
}