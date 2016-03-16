export class AmmaSyncEventEmitterService {

    private _items = {};
    private $rootScope:ng.IRootScopeService;

    /** @ngInject */
    constructor($rootScope:ng.IRootScopeService) {
        this.$rootScope = $rootScope;
    }

    emit = (eventName:string, options:any)=> {
        this._items = {};
        this.$rootScope.$emit(eventName, {
            items: this._items,
            options: options
        });
        return this._items;
    };

    on = (eventName:string, callback) => {
        this.$rootScope.$on(eventName, callback);
    };

}
