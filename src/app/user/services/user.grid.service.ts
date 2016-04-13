import {AmmaBaseGridService} from "../../amma-util/services/amma.base.grid.service";
import {UserGridOptions} from "../configs/grid/user.grid.options";
export class UserGridService extends AmmaBaseGridService {
    /** @ngInject */
    constructor(userRestService) {
        this.gridOptions = UserGridOptions;
        super(userRestService);
    }
}
