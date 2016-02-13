export interface IAmmaBlock {
  id: string;
  templateUrl:string;
  priority?:number;
  data?:{};
}

export class AmmaBlockService {

  /** @ngInject */
  constructor(private $rootScope:ng.IRootScopeService) {
  }

  public getTabs(eventName:string, options:any, initBlocks:IAmmaBlock[]) {
    let blocks:IAmmaBlock[] = [];
    if (initBlocks) {
      blocks = initBlocks;
    }
    this.$rootScope.$emit(eventName, {
      blocks: blocks,
      options: options
    });
    blocks.sort(this.sortFunc('priority'));
    return blocks;
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
