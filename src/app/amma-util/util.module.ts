import {AmmaControllerDirective} from './directives/amma-controller.directive';
import {AmmaTabsDirective} from './directives/amma-tabs.directive';
import {AmmaTabsService} from "./tabs/amma-tabs.service";
import {AmmaFileUploadDirective} from './directives/amma-file-upload.directive';
import {AmmaEventEmitterService} from "./services/amma.event.emitter.service";
import {AmmaSyncEventEmitterService} from "./services/amma.sync.event.emitter.service";

import {AmmaFileGalleryController} from "./controller/amma-file.gallery.controller";

export module AmmaUtil {
    angular
        .module('amma.util', ['ngFileUpload'])
        .controller('AmmaFileGalleryController', AmmaFileGalleryController)
        .directive('ammaController', AmmaControllerDirective)
        .service('AmmaTabsService', AmmaTabsService)
        .service('AmmaEventEmitterService', AmmaEventEmitterService)
        .service('AmmaSyncEventEmitterService', AmmaSyncEventEmitterService)
        .directive('ammaFileUpload', AmmaFileUploadDirective)
        .directive('ammaTabs', AmmaTabsDirective);


}
