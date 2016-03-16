export class WhitelabelRestService {

    private $log:ng.ILogService;
    private endPoint = 'whitelabels';
    private eventName = 'whitelabel';
    private restService;
    protected ammaEventEmitterService;
    private $q;


    /** @ngInject */
    constructor($log:ng.ILogService, Restangular, AmmaEventEmitterService, $q) {
        this.$log = $log;
        this.restService = Restangular.all(this.getEndPoint());
        this.ammaEventEmitterService = AmmaEventEmitterService;
        this.$q = $q;
    }

    getList = (data = {}) => {
        const defer = this.$q.defer();
        const dataPromise = this.getRestService().getList(data);
        dataPromise.then((resp:any) => {
            this.ammaEventEmitterService.emit(this.getEventName('post-get-list'), resp, (err, response)=> {
                if (err) {
                    defer.reject(err);
                }
                else {
                    defer.resolve(response);
                }
            });
        }, (resp:any) => {
            defer.reject(resp);
        });
        return defer.promise;
    };

    getById(id) {
        const defer = this.$q.defer();
        const dataPromise = this.getRestService().get(id);
        dataPromise.then((resp:any) => {
            this.ammaEventEmitterService.emit(this.getEventName('post-get-id'), resp, (err, response)=> {
                if (err) {
                    defer.reject(err);
                }
                else {
                    response.internal = {};
                    defer.resolve(response);
                }
            });
        }, (resp:any) => {
            defer.reject(resp);
        });
        return defer.promise;
    }

    removeById(id) {
        const defer = this.$q.defer();
        const dataPromise = this.getRestService().one(id).remove();

        dataPromise.then((resp:any) => {
            this.ammaEventEmitterService.emit(this.getEventName('post-remove'), {
                _id: id,
                response: resp
            }, (err, response)=> {
                if (err) {
                    defer.reject(err);
                }
                else {
                    defer.resolve(response);
                }
            });
        }, (resp:any) => {
            defer.reject(resp);
        });
        return defer.promise;
    }

    save(model) {
        let isNew = true;
        if (model.put) {
            isNew = false;
        }
        const preEvent = isNew ? 'pre-create' : 'pre-save';
        const postEvent = isNew ? 'post-create' : 'post-save';

        const defer = this.$q.defer();

        this.ammaEventEmitterService.emit(this.getEventName(preEvent), model, (err, options)=> {
            if (err) {
                defer.reject(err);
            } else {
                let q;
                if (isNew) {
                    q = this.getRestService().post(options);
                }
                else {
                    q = options.put();
                }
                q.then((response:any)=> {
                    if (!options.internal) {
                        options.internal = {};
                    }
                    response.internal = options.internal;
                    this.ammaEventEmitterService.emit(this.getEventName(postEvent), response, (err, options)=> {
                        if (err) {
                            defer.reject(err);
                        }
                        else {
                            defer.resolve(options);
                        }
                    });
                }, (responseError)=> {
                    console.log(responseError);
                    defer.reject(responseError);
                });
            }
        });
        return defer.promise;
    }

    getRestService() {
        return this.restService;
    }

    getEndPoint() {
        return this.endPoint;
    }

    getEventName(name = null) {
        if (!name) {
            return this.eventName;
        }
        return this.eventName + '-' + name;
    }

    getLogos(id) {
        return this.restService.one(id).one('logos').get();
    }

}
