import {UserGridOptions} from '../configs/user.grid.options';
export class UserGridService {

  public gridOptions = UserGridOptions;
  public restService:restangular.ICollection;
  private $log:ng.ILogService;

  /** @ngInject */
  constructor($log:ng.ILogService, UserRestService:restangular.ICollection) {
    this.$log = $log;
    this.restService = UserRestService;
    this.injectRestService();

  }

  public restCall = (options) => {
    var dataPromise = this.restService.getList(options.data);
    this.$log.debug(options);
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

  private injectRestService() {
    this.gridOptions.dataSource['transport'] = {
      read: this.restCall
    }
  }


}
