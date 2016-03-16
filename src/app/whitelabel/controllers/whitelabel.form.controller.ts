
import {WhitelabelRestService} from "../services/whitelabel.rest.service";
export class WhitelabelFormController {
    protected restService:WhitelabelRestService;
    protected $state;
    protected $mdToast;

    public brands;
    public model = {};
    public isNew = false;

    /* @ngInject */
    constructor(whitelabelRestService:WhitelabelRestService, $state, $mdToast, model, brands) {
        if (!model) {
            this.isNew = true;
        }
        this.model = model || {};
        this.brands = brands;
        this.restService = whitelabelRestService;
        this.$state = $state;
        this.$mdToast = $mdToast;
    }

    submit() {
        this.restService.save(this.model).then((response)=> {
            this.model = response;
            this.afterSubmit();
        }, (error)=> {
            console.log('tst');
            this.displayErrorMessage(error.data.message);
        });
    }

    afterSubmit() {
        if (this.isNew) {
            this.displaySuccessMessage('Whitelabel has been created successfully');
        } else {
            this.displaySuccessMessage('Whitelabel has been saved successfully');
        }
        this.$state.go('triangular.admin-default.whitelabel');
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