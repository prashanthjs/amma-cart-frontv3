import {AmmaFileUploadController} from "../../amma-util/controller/amma-file.upload.controller";

export class WhitelabelUploadController extends AmmaFileUploadController {

    protected AmmaEventEmitterService;
    protected $scope;

    /* @ngInject */
    constructor($scope, Upload, $timeout, $log:ng.ILogService, $http:ng.IHttpService, $mdToast, $mdDialog, AmmaEventEmitterService) {
        super(Upload, $timeout, $log, $http, $mdToast, $mdDialog);
        this.AmmaEventEmitterService = AmmaEventEmitterService;
        this.$scope = $scope;
    }

    init(id = null) {
        this.addData('id', id);
        this.AmmaEventEmitterService.on(this.$scope, 'whitelabel-post-save', this.save);
        this.AmmaEventEmitterService.on(this.$scope, 'whitelabel-post-create', this.save);
        if (id) {
            this.ammaFileTokenUrl = '/whitelabels/logo/prepare/{id}';
        } else {
            this.ammaFileTokenUrl = '/whitelabels/logo/prepare';
        }
        this.ammaFileUploadUrl = '/whitelabels/logo/temp/upload/{token}';
        this.ammaFileDeleteUrl = '/whitelabels/logo/temp/remove/{token}/{file}';
        this.ammaFileListUrl = '/whitelabels/logo/temp/{token}';
        this.ammaFileSaveUrl = '/whitelabels/logo/temp/save/{id}/{token}';
        this.ammaFileViewBaseUrl = '/whitelabels/logo/temp/get/{token}/{file}';
        this.getToken();
    }

    save = (model, next) => {
        this.addData('id', model._id);
        this.saveFiles(next);
    };

}