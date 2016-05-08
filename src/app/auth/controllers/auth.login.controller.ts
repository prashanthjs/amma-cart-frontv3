import {AuthRestService} from "../services/auth.rest.service";
import {AuthService} from "../services/auth.service";
import {AmmaBaseController} from "../../amma-util/controller/amma.base.controller";
export class AuthLoginController extends AmmaBaseController {

    public triSettings;
    public $state;
    public model:any = {};
    private authRestService:AuthRestService;
    private authService:AuthService;
    private $location;
    /* @ngInject */
    constructor(triSettings, authService, $mdToast, $location) {
        super($mdToast);
        this.triSettings = triSettings;
        this.authService = authService;
        this.$location = $location;

    }

    submit() {
        const promise = this.authService.login(this.model.username, this.model.password);
        promise.then((result)=> {
            this.$location.path('/');
        }, (error)=> {
            this.displayErrorMessage(error.data.message);
        });
    }
}