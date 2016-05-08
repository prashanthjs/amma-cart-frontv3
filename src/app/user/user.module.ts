import {Config} from './configs/index';
import {UserRestService} from "./services/user.rest.service";
import {UserGridService} from "./services/user.grid.service";
import {UserFormController} from "./controllers/user.form.controller";
import {UserChangePasswordFormController} from "./controllers/user.changepassword.form.controller";
import {UserUploadController} from "./controllers/user.upload.controller";
import {UserListController} from "./controllers/user.list.controller";
import {UserViewController} from "./controllers/user.view.controller";
import {UserService} from "./services/user.service";

export module User {
    angular
        .module('user', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('UserViewController', UserViewController)
        .controller('UserListController', UserListController)
        .controller('UserUploadController', UserUploadController)
        .controller('UserFormController', UserFormController)
        .controller('UserChangePasswordFormController', UserChangePasswordFormController)
        .service('userGridService', UserGridService)
        .service('userRestService', UserRestService)
        .service('userService', UserService)
        .constant('USER_IMAGE_BASE_PATH', '/users/profile-pic-images/');

}
