import {AmmaBaseUploadController} from "../../amma-util/controller/amma.base.upload.controller";

export class UserUploadController extends AmmaBaseUploadController {

    init(id = null) {
        this.addData('id', id);
        this.eventEmitter.on(this.$scope, 'user-post-save', this.save);
        this.eventEmitter.on(this.$scope, 'user-post-create', this.save);
        if (id) {
            this.ammaFileTokenUrl = '/users/{id}/profile-pic/prepare';
        } else {
            this.ammaFileTokenUrl = '/users/profile-pic/prepare';
        }
        this.ammaFileUploadUrl = '/users/{token}/profile-pic-temp/upload';
        this.ammaFileDeleteUrl = '/users/{token}/profile-pic-temp/{file}';
        this.ammaFileListUrl = '/users/{token}/profile-pic-temp';
        this.ammaFileSaveUrl = '/users/{id}/{token}/profile-pic-temp/save';
        this.ammaFileViewBaseUrl = '/users/profile-pic-images-temp/{token}/{file}';
        this.getToken();
    }

    save = (model, next) => {
        this.addData('id', model._id);
        this.saveFiles(next);
    };

}