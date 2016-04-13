import {StoreGridService} from "../services/store.grid.service";
import {StoreRestService} from "../services/store.rest.service";
import {AmmaBaseListController} from "../../amma-util/controller/amma.base.list.controller";

export class StoreListController extends AmmaBaseListController {

    protected restService:StoreRestService;

    /* @ngInject */
    constructor(storeGridService:StoreGridService, storeRestService:StoreRestService, $mdToast, $mdDialog, $state) {
        super($mdToast, $mdDialog, $state);
        this.gridOptions = storeGridService.gridOptions;
        this.restService = storeRestService;
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete the Store ' + dataItem._id + ' ?';
    }

}


