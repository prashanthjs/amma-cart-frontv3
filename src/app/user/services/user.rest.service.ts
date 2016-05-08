import {AmmaBaseRestService} from "../../amma-util/services/amma.base.rest.service";

export class UserRestService extends AmmaBaseRestService {

    /** @ngInject */
    constructor(Restangular, AmmaEventEmitterService, $q) {
        this.endPoint = 'users';
        this.eventName = 'user';
        super(Restangular, AmmaEventEmitterService, $q);
    }

    getProfilePics(id) {
        return this.restService.one(id).one('profile-pic').get();
    }

    updatePassword(id, password) {
        return this.restService.one(id).one('change-password').customPUT({password: password});
    }

}
