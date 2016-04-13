import {AmmaBaseGridService} from "../../amma-util/services/amma.base.grid.service";
import {StoreGridOptions} from "../configs/grid/store.grid.options";
export class StoreGridService extends AmmaBaseGridService {
    /** @ngInject */
    constructor(storeRestService) {
        this.gridOptions = StoreGridOptions;
        super(storeRestService);
    }
}
