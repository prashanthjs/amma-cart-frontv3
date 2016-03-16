import {WhitelabelGridOptions} from '../configs/grid/whitelabel.grid.options';
import {WhitelabelRestService} from "./whitelabel.rest.service";

export class WhitelabelGridService {

    private $log:ng.ILogService;
    public gridOptions = WhitelabelGridOptions;
    public restService:WhitelabelRestService;

    /** @ngInject */
    constructor($log:ng.ILogService, whitelabelRestService: WhitelabelRestService) {
        this.$log = $log;
        this.restService = whitelabelRestService;
        this.injectRestService();
    }

    restCall = (options) => {
        const dataPromise = this.restService.getList(options.data);
        dataPromise.then((resp:any) => {
            var plain:any = resp.plain();
            options.success(plain);
            this.$log.debug(plain);
        });
        dataPromise.catch((resp:any) => {
            var msg = 'Issue loading asset cases:' + JSON.stringify(resp);
            options.error(msg)
        });
    };

    protected injectRestService() {
        this.gridOptions.dataSource['transport'] = {
            read: this.restCall
        }
    }
}
