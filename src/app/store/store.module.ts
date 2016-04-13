import {Config} from './configs/index';
import {StoreRestService} from "./services/store.rest.service";
import {StoreGridService} from "./services/store.grid.service";
import {StoreFormController} from "./controllers/store.form.controller";
import {StoreUploadController} from "./controllers/store.upload.controller";
import {StoreListController} from "./controllers/store.list.controller";
import {StoreViewController} from "./controllers/store.view.controller";

export module Store {
    angular
        .module('store', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('StoreViewController', StoreViewController)
        .controller('StoreListController', StoreListController)
        .controller('StoreUploadController', StoreUploadController)
        .controller('StoreFormController', StoreFormController)
        .service('storeGridService', StoreGridService)
        .service('storeRestService', StoreRestService);

}
