import {IAmmaTab} from '../tabs/amma-tabs.service';
import {AmmaTabsService} from '../tabs/amma-tabs.service';

export interface IScope extends ng.IScope {
  ammaEventName:string;
  ammaInitTabs:IAmmaTab[];
  ammaOptions?:any;
}

/** @ngInject */
export function AmmaTabsDirective():ng.IDirective {
  return {
    restrict: 'E',
    scope: {
      ammaEventName: '@',
      ammaInitTabs: '=',
      ammaOptions: '='
    },
    templateUrl: 'app/amma-util/views/amma-tabs.html',
    controller: AmmaTabController,
    controllerAs: 'vm'
  };

}

/** @ngInject */
export class AmmaTabController {
  public tabs:IAmmaTab[] = [];
  public initTabs:IAmmaTab[] = [];
  public eventName:string;
  public options:any;

  constructor(private $scope:IScope, private AmmaTabsService:AmmaTabsService) {
    this.initTabs = this.$scope.ammaInitTabs;
    this.eventName = this.$scope.ammaEventName;
    this.options = this.$scope.ammaOptions;
    this.prepareTabs();
  }

  prepareTabs() {
    this.tabs = this.AmmaTabsService.getTabs(this.eventName, this.options, this.initTabs);
  }
}
