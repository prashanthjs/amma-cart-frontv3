import {WhitelabelGridService} from "../services/whitelabel.grid.service";
import {WhitelabelRestService} from "../services/whitelabel.rest.service";
export class WhitelabelListController {

    private restService:WhitelabelRestService;
    private $mdToast;
    private $mdDialog;
    private $state;

    public gridOptions:{};
    public grid;

    /* @ngInject */
    constructor(whitelabelGridService:WhitelabelGridService, whitelabelRestService:WhitelabelRestService, $mdToast, $mdDialog, $state) {
        this.gridOptions = whitelabelGridService.gridOptions;
        this.restService = whitelabelRestService;
        this.$mdToast = $mdToast;
        this.$mdDialog = $mdDialog;
        this.$state = $state;
    }

    editItem(dataItem, $event) {
        this.$state.go('triangular.admin-default.whitelabel-edit', {id: dataItem._id});
    }


    deleteItem(dataItem, $event) {
        const confirm = this.$mdDialog.confirm()
            .title('Would you like to delete the whitelabel ' + dataItem._id + ' ?')
            .ariaLabel('Delete whitelabel')
            .targetEvent($event)
            .ok('Yes')
            .cancel('No');
        this.$mdDialog.show(confirm).then(() => {
            this.restService.removeById(dataItem._id).then((response)=> {
                this.displaySuccessMessage('Removed Successfully');
                this.grid.dataSource.read();
            });
        }, () => {

        });

    }

    displayErrorMessage(message) {
        this.$mdToast.show({
            template: '<md-toast><span flex>Error: ' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    }

    displaySuccessMessage(message) {
        this.$mdToast.show({
            template: '<md-toast><span flex>' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    }
}


