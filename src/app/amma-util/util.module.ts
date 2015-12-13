import {AmmaControllerDirective} from './directives/amma-controller.directive';
import {AmmaTabsDirective} from './directives/amma-tabs.directive';
import {AmmaTabsService} from "./tabs/amma-tabs.service";
import {AmmaFileUploadDirective} from './directives/amma-file-upload.directive';

export module AmmaUtil {
  angular
    .module('amma.util', ['ngFileUpload'])
    .directive('ammaController', AmmaControllerDirective)
    .service('AmmaTabsService', AmmaTabsService)
    .directive('ammaFileUpload', AmmaFileUploadDirective)
    .directive('ammaTabs', AmmaTabsDirective);


}
