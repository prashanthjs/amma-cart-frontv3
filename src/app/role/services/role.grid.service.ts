import {AmmaBaseGridService} from "../../amma-util/services/amma.base.grid.service";
import {RoleGridOptions} from "../configs/grid/role.grid.options";
export class RoleGridService extends AmmaBaseGridService {
    /** @ngInject */
    constructor(roleRestService) {
        this.gridOptions = RoleGridOptions;
        super(roleRestService);
    }
}
