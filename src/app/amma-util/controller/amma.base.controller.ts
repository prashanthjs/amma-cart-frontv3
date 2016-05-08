export class AmmaBaseController {
    protected $mdToast;

    /* @ngInject */
    constructor($mdToast) {
        this.$mdToast = $mdToast;
    }

    displayErrorMessage(message) {
        this.$mdToast.show({
            template: '<md-toast class="md-toast error">' + message + '</md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    }

    displaySuccessMessage(message) {
        this.$mdToast.show({
            template: '<md-toast class="md-toast success">' + message + '</md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    }
}