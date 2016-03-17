import {AmmaBaseController} from "./amma.base.controller";

export class AmmaBaseFormController extends AmmaBaseController {
    protected restService;
    protected $state;
    protected $mdToast;

    public brands;
    public model = {};
    public isNew = false;

    /* @ngInject */
    constructor($state, $mdToast, model) {
        super($mdToast);
        if (!model) {
            this.isNew = true;
        }
        this.model = model || {};
        this.$state = $state;
    }

    submit() {
        this.restService.save(this.model).then((response)=> {
            this.model = response;
            this.afterSubmit();
        }, (error:any)=> {
            this.displayErrorMessage(error.data.message);
        });
    }

    afterSubmit() {
        throw new Error('This function has to be implemented');
    }
}