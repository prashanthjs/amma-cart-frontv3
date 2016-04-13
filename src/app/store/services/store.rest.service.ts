import {AmmaBaseRestService} from "../../amma-util/services/amma.base.rest.service";

export class StoreRestService extends AmmaBaseRestService {

    /** @ngInject */
    constructor(Restangular, AmmaEventEmitterService, $q) {
        this.endPoint = 'stores';
        this.eventName = 'store';
        super(Restangular, AmmaEventEmitterService, $q);
    }

    getImages(id) {
        return this.restService.one(id).one('images').get();
    }

}
