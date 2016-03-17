import {WhitelabelGridService} from "../services/whitelabel.grid.service";
import {WhitelabelRestService} from "../services/whitelabel.rest.service";
import {AmmaBaseListController} from "../../amma-util/controller/amma.base.list.controller";

export class WhitelabelListController extends AmmaBaseListController {

    protected restService:WhitelabelRestService;

    /* @ngInject */
    constructor(whitelabelGridService:WhitelabelGridService, whitelabelRestService:WhitelabelRestService, $mdToast, $mdDialog, $state) {
        super($mdToast, $mdDialog, $state);
        this.gridOptions = whitelabelGridService.gridOptions;
        this.restService = whitelabelRestService;
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete the Whitelabel ' + dataItem._id + ' ?';
    }

}


