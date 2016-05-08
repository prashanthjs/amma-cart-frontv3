import {Config} from './configs/index';
import {CategoryRestService} from "./services/category.rest.service";
import {CategoryGridService} from "./services/category.grid.service";
import {CategoryFormController} from "./controllers/category.form.controller";
import {CategoryUploadController} from "./controllers/category.upload.controller";
import {CategoryListController} from "./controllers/category.list.controller";
import {CategoryViewController} from "./controllers/category.view.controller";

export module Category {
    angular
        .module('category', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('CategoryViewController', CategoryViewController)
        .controller('CategoryListController', CategoryListController)
        .controller('CategoryUploadController', CategoryUploadController)
        .controller('CategoryFormController', CategoryFormController)
        .service('categoryGridService', CategoryGridService)
        .service('categoryRestService', CategoryRestService);

}
