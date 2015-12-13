export interface IAmmaTab {
  title: string;
  templateUrl:string;
  priority?:number;
  data?:{};
}

export class AmmaTabsService {

  /** @ngInject */
  constructor(private $rootScope:ng.IRootScopeService) {
  }

  public getTabs(eventName:string, options:any, initTabs:IAmmaTab[]) {
    let tabs:IAmmaTab[] = [];
    if (initTabs) {
      tabs = initTabs;
    }
    this.$rootScope.$emit(eventName, {
      tabs: tabs,
      options: options
    });
    tabs.sort(this.sortFunc('priority'))
    return tabs;
  }

  private sortFunc(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    }
  }

}
