export class AmmaBaseController {
    protected $mdToast;

    /* @ngInject */
    constructor($mdToast) {
        this.$mdToast = $mdToast;
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