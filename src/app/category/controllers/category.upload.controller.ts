import {AmmaBaseUploadController} from "../../amma-util/controller/amma.base.upload.controller";

export class CategoryUploadController extends AmmaBaseUploadController {

    init(id = null) {
        this.addData('id', id);
        this.eventEmitter.on(this.$scope, 'category-post-save', this.save);
        this.eventEmitter.on(this.$scope, 'category-post-create', this.save);
        if (id) {
            this.ammaFileTokenUrl = '/categories/{id}/images/prepare';
        } else {
            this.ammaFileTokenUrl = '/categories/images/prepare';
        }
        this.ammaFileUploadUrl = '/categories/{token}/images-temp/upload';
        this.ammaFileDeleteUrl = '/categories/{token}/images-temp/{file}';
        this.ammaFileListUrl = '/categories/{token}/images-temp';
        this.ammaFileSaveUrl = '/categories/{id}/{token}/images-temp/save';
        this.ammaFileViewBaseUrl = '/categories/images-temp/{token}/{file}';
        this.getToken();
    }

    save = (model, next) => {
        this.addData('id', model._id);
        this.saveFiles(next);
    };

}