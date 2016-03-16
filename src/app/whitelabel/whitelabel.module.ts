import {Config} from './configs/index';
import {WhitelabelRestService} from "./services/whitelabel.rest.service";
import {WhitelabelGridService} from "./services/whitelabel.grid.service";
import {WhitelabelFormController} from "./controllers/whitelabel.form.controller";
import {WhitelabelUploadController} from "./controllers/whitelabel.upload.controller";
import {WhitelabelListController} from "./controllers/whitelabel.list.controller";
import {WhitelabelViewController} from "./controllers/whitelabel.view.controller";

export module Whitelabel {
    angular
        .module('whitelabel', ['kendo.directives', 'restangular', 'amma.util'])
        .config(Config)
        .controller('WhitelabelViewController', WhitelabelViewController)
        .controller('WhitelabelListController', WhitelabelListController)
        .controller('WhitelabelUploadController', WhitelabelUploadController)
        .controller('WhitelabelFormController', WhitelabelFormController)
        .service('whitelabelGridService', WhitelabelGridService)
        .service('whitelabelRestService', WhitelabelRestService)
        .run(function (Restangular, $location) {
            Restangular.setErrorInterceptor(function (resp) {
                if (resp.status === 404) {
                    $location.path('/404');
                }
                return resp;
            });
        });

}
