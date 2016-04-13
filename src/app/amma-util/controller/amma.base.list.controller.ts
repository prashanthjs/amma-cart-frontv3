import {AmmaBaseController} from "./amma.base.controller";
export class AmmaBaseListController extends AmmaBaseController {

    protected restService;
    protected $mdDialog;
    protected $state;

    public gridOptions:{};
    public grid;

    /* @ngInject */
    constructor($mdToast, $mdDialog, $state) {
        super($mdToast);
        this.$mdDialog = $mdDialog;
        this.$state = $state;
    }


    deleteItem(dataItem, $event) {
        const confirm = this.$mdDialog.confirm()
            .title(this.getDeleteItemTitle(dataItem))
            .ariaLabel('Delete Item')
            .targetEvent($event)
            .ok('Yes')
            .cancel('No');
        this.$mdDialog.show(confirm).then(() => {
            this.restService.removeById(dataItem._id).then((response)=> {
                this.displaySuccessMessage('Removed Successfully');
                this.grid.dataSource.read();
            }, (response) => {
                this.displayErrorMessage('Error: '+ response);
            });
        });
    }

    getDeleteItemTitle(dataItem) {
        return 'Would you like to delete ' + dataItem._id + '?';
    }

}
