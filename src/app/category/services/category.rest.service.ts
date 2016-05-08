import {AmmaBaseRestService} from "../../amma-util/services/amma.base.rest.service";

export class CategoryRestService extends AmmaBaseRestService {

    /** @ngInject */
    constructor(Restangular, AmmaEventEmitterService, $q) {
        this.endPoint = 'categories';
        this.eventName = 'category';
        super(Restangular, AmmaEventEmitterService, $q);
    }

    getImages(id) {
        return this.restService.one(id).one('images').get();
    }

}
