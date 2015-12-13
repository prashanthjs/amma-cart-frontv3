export class AmmaEventEmitterService {

  private _items = {};
  private $rootScope:ng.IRootScopeService;

  /** @ngInject */
  constructor($rootScope:ng.IRootScopeService) {
    this.$rootScope = $rootScope;
  }

  public getItems = (eventName:string, options:any)=> {
    this._items = {};
    this.$rootScope.$emit(eventName, {
      items: this._items,
      options: options
    });
    return this._items;
  };


}
