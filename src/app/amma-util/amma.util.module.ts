import {AmmaControllerDirective} from './directives/amma-controller.directive';
import {AmmaTabsDirective} from './directives/amma-tabs.directive';
import {AmmaTabsService} from "./tabs/amma-tabs.service";
import {AmmaFileUploadDirective} from './directives/amma-file-upload.directive';
import {AmmaEventEmitterService} from "./services/amma.event.emitter.service";
import {AmmaBaseGalleryController} from "./controller/amma.base.gallery.controller";

export module AmmaUtil {
    angular
        .module('amma.util', ['ngFileUpload'])
        .controller('AmmaBaseGalleryController', AmmaBaseGalleryController)
        .directive('ammaController', AmmaControllerDirective)
        .service('AmmaTabsService', AmmaTabsService)
        .service('AmmaEventEmitterService', AmmaEventEmitterService)
        .directive('ammaFileUpload', AmmaFileUploadDirective)
        .directive('ammaTabs', AmmaTabsDirective);
}
