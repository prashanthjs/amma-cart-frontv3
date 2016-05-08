import {AmmaBaseRestService} from "../../amma-util/services/amma.base.rest.service";

export class AuthRestService extends AmmaBaseRestService {

    /** @ngInject */
    constructor(Restangular, AmmaEventEmitterService, $q) {
        this.endPoint = 'auth';
        this.eventName = 'auth';
        super(Restangular, AmmaEventEmitterService, $q);
    }

    login(username, password) {
        return this.restService.one('login').customPOST({_id: username, password: password});
    }

    logout() {
        return this.restService.one('logout').get();
    }
}
