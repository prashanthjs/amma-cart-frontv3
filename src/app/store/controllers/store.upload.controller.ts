import {AmmaBaseUploadController} from "../../amma-util/controller/amma.base.upload.controller";

export class StoreUploadController extends AmmaBaseUploadController {

    init(id = null) {
        this.addData('id', id);
        this.eventEmitter.on(this.$scope, 'store-post-save', this.save);
        this.eventEmitter.on(this.$scope, 'store-post-create', this.save);
        if (id) {
            this.ammaFileTokenUrl = '/stores/{id}/images/prepare';
        } else {
            this.ammaFileTokenUrl = '/stores/images/prepare';
        }
        this.ammaFileUploadUrl = '/stores/{token}/images-temp/upload';
        this.ammaFileDeleteUrl = '/stores/{token}/images-temp/{file}';
        this.ammaFileListUrl = '/stores/{token}/images-temp';
        this.ammaFileSaveUrl = '/stores/{id}/{token}/images-temp/save';
        this.ammaFileViewBaseUrl = '/stores/images-temp/{token}/{file}';
        this.getToken();
    }

    save = (model, next) => {
        this.addData('id', model._id);
        this.saveFiles(next);
    };

}