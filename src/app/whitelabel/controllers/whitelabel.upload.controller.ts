import {AmmaBaseUploadController} from "../../amma-util/controller/amma.base.upload.controller";

export class WhitelabelUploadController extends AmmaBaseUploadController {

    init(id = null) {
        this.addData('id', id);
        this.eventEmitter.on(this.$scope, 'whitelabel-post-save', this.save);
        this.eventEmitter.on(this.$scope, 'whitelabel-post-create', this.save);
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