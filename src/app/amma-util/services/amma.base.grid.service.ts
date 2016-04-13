export class AmmaBaseGridService {

    protected restService;
    public gridOptions;

    /** @ngInject */
    constructor(restService) {
        this.restService = restService;
        this.injectRestService();
    }

    restCall = (options) => {
        const dataPromise = this.restService.getList(options.data);
        dataPromise.then((resp:any) => {
            var plain:any = resp.plain();
            options.success(plain);
        });
        dataPromise.catch((resp:any) => {
            var msg = 'Issue loading asset cases:' + JSON.stringify(resp);
            options.error(msg)
        });
    };

    injectRestService() {
        this.gridOptions.dataSource['transport'] = {
            read: this.restCall
        }
    }
}
