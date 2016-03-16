import {UserGridService} from '../services/user.grid.service';
import {IAmmaTab} from "../../amma-util/tabs/amma-tabs.service";
export class UserIndexController {

    public userGridOptions:{};
    public grid;
    /* @ngInject */
    constructor(UserGridService:UserGridService) {
        this.userGridOptions = UserGridService.gridOptions;
    }

    deleteItem(dataItem) {
        this.grid.dataSource.read();
        console.log(dataItem);

    }

}
