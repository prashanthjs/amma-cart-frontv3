import {AmmaBaseController} from "./amma.base.controller";

export class AmmaBaseViewController extends AmmaBaseController {
    public model:any = {};
    public images = {};
    public imageUrl;
    public baseUrl;

    protected $mdDialog;

    /* @ngInject */
    constructor(model, $mdDialog, $mdToast, API_CONFIG) {
        super($mdToast);
        this.model = model;
        this.baseUrl = API_CONFIG.url;
        this.$mdDialog = $mdDialog;
    }

    getUrl(image) {
        const model:any = this.model;
        return this.baseUrl + this.imageUrl + model._id + '/' + image;
    }

    openImage(file, $event) {
        const images = this.formattedFilesList();
        const image = this.formattedFile(file);
        this.$mdDialog.show({
            controller: 'AmmaBaseGalleryController',
            controllerAs: 'ammaBaseGalleryController',
            templateUrl: 'app/amma-util/views/amma.base.gallery.html',
            clickOutsideToClose: true,
            focusOnOpen: false,
            targetEvent: $event,
            locals: {
                images: images,
                image: image
            }
        });
    }

    formattedFilesList() {
        let temp = [];
        angular.forEach(this.images, (file)=> {
            temp.push(this.formattedFile(file));
        });
        return temp;
    }

    formattedFile(file) {
        return {
            title: file,
            urlFull: this.getUrl(file)
        };
    }
}