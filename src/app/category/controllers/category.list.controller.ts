import {CategoryGridService} from "../services/category.grid.service";
import {CategoryRestService} from "../services/category.rest.service";
import {AmmaBaseListController} from "../../amma-util/controller/amma.base.list.controller";

export class CategoryListController extends AmmaBaseListController {

    protected restService:CategoryRestService;

    /* @ngInject */
    constructor(categoryGridService:CategoryGridService, categoryRestService:CategoryRestService, $mdToast, $mdDialog, $state) {
        super($mdToast, $mdDialog, $state);
        this.gridOptions = categoryGridService.gridOptions;
        this.restService = categoryRestService;
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete the Category ' + dataItem._id + ' ?';
    }

}


