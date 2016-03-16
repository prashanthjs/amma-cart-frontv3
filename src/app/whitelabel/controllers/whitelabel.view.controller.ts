import {WhitelabelRestService} from "../services/whitelabel.rest.service";
export class WhitelabelViewController {
    public model = {};
    public images = {};
    public imageUrl = '/whitelabels/logo/get/';
    public baseUrl;
    private $mdDialog;

    /* @ngInject */
    constructor(model, images, API_CONFIG, $mdDialog) {
        this.model = model;
        this.images = images.files;
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
            controller: 'AmmaFileGalleryController',
            controllerAs: 'ammaFileGalleryController',
            templateUrl: 'app/amma-util/views/amma-file.gallery.html',
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
    };

    formattedFile(file) {
        return {
            title: file,
            urlFull: this.getUrl(file)
        };
    }
}