import {AmmaBaseGridService} from "../../amma-util/services/amma.base.grid.service";
import {CategoryGridOptions} from "../configs/grid/category.grid.options";
export class CategoryGridService extends AmmaBaseGridService {
    /** @ngInject */
    constructor(categoryRestService) {
        this.gridOptions = CategoryGridOptions;
        super(categoryRestService);
    }
}
