import {AmmaBaseRestService} from "../../amma-util/services/amma.base.rest.service";

export class RoleRestService extends AmmaBaseRestService {

    /** @ngInject */
    constructor(Restangular, AmmaEventEmitterService, $q) {
        this.endPoint = 'roles';
        this.eventName = 'role';
        super(Restangular, AmmaEventEmitterService, $q);
    }

    getAllPrivileges() {
        return this.restService.one('get-all-privileges').get();
    }
}
