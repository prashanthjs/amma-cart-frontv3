import {AmmaBaseController} from "./amma.base.controller";
import {AmmaEventEmitterService} from "../services/amma.event.emitter.service";


export interface IResponse {
    data:{
        token: string
        files:string[];
    };
}

export class AmmaBaseUploadController extends AmmaBaseController {

    public files:any[];
    public errorFiles:any[];
    public isBusy:boolean = false;

    public listFiles:any[];

    public baseUrl;

    public ammaFileTokenUrl = '';
    public ammaFileUploadUrl = '';
    public ammaFileDeleteUrl = '';
    public ammaFileListUrl = '';
    public ammaFileSaveUrl = '';
    public ammaFileViewBaseUrl = '';
    public ammaFileData:{};
    public ammaFileKey:string = 'file';

    protected Upload;
    protected $timeout;
    protected $http:ng.IHttpService;
    protected $mdToast;
    protected $mdDialog;
    protected eventEmitter:AmmaEventEmitterService;
    protected $scope;

    public data = {};

    /* @ngInject */
    constructor($scope, Upload, $timeout, $http:ng.IHttpService, $mdToast, $mdDialog, API_CONFIG, AmmaEventEmitterService) {
        super($mdToast);
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$http = $http;
        this.$mdDialog = $mdDialog;
        this.baseUrl = API_CONFIG.url;
        this.eventEmitter = AmmaEventEmitterService;
        this.$scope = $scope;
    }

    setData(data) {
        this.data = data;
    }

    addData(key, value) {
        this.data[key] = value;
    }

    getData(key) {
        return this.data[key]
    }

    resolveUrl(url, extraParams = {}) {
        angular.forEach(this.data, (value, key) => {
            url = url.replace('{' + key + '}', value);
        });
        if (extraParams) {
            angular.forEach(extraParams, (value, key) => {
                url = url.replace('{' + key + '}', value);
            });
        }
        url = this.baseUrl + url;
        return url;
    }


    getToken() {
        const url = this.resolveUrl(this.ammaFileTokenUrl);
        this.isBusy = true;
        let promise = this.$http({
            method: 'GET',
            url: url,
            data: this.ammaFileData
        });
        promise.then((response:IResponse)=> {
            this.isBusy = false;
            this.addData('token', response.data.token);
            this.getFiles();
        }, (response) => {
            this.displayErrorMessage('Cannot retrieve token');
            this.isBusy = false;
            this.addData('token', '');
        });

    };

    uploadFiles(files, errorFiles) {

        angular.forEach(errorFiles, (errorFile)=> {
            this.displayErrorMessage('Error:' + errorFile.name);
        });
        const uploadUrl = this.resolveUrl(this.ammaFileUploadUrl);
        this.isBusy = true;
        angular.forEach(files, (file:any) => {
            let temp = {};
            temp[this.ammaFileKey] = file;
            temp['data'] = this.ammaFileData;
            file.isBusy = true;
            file.upload = this.Upload.upload({
                url: uploadUrl,
                data: temp
            }).then((response) => {
                this.$timeout(() => {
                    file.result = response.data;
                    file.isBusy = false;
                    this.displaySuccessMessage('Uploaded: ' + file.name);
                    this.updateStatus(files);
                });
            }, (response:any) => {
                file.isBusy = false;
                this.displayErrorMessage('Error: ' + file.name);
                this.updateStatus(files);
            }, (evt) => {
                file.progress = Math.min(100, Math.floor(100.0 * evt.loaded / evt.total));
            });
        });
        this.updateStatus(files)
    };

    updateStatus(files:any[]) {
        let count = 0;
        angular.forEach(files, (file:any) => {
            if (file.isBusy) {
                count++;
            }
        });
        if (count == 0) {
            this.isBusy = false;
        }
        this.getFiles();
    };


    getFiles() {
        this.isBusy = true;
        const listUrl = this.resolveUrl(this.ammaFileListUrl);
        const promise = this.$http({
            method: 'GET',
            url: listUrl,
            data: this.ammaFileData
        });
        promise.then((response:any)=> {
            this.listFiles = response.data.files;
            this.isBusy = false;
        }, (response) => {
            this.listFiles = [];
            this.isBusy = false;
            this.displayErrorMessage('Could not get the files');
        });

    };


    deleteFile(file:string, $event) {
        $event.stopPropagation();
        const url = this.resolveUrl(this.ammaFileDeleteUrl, {file: file});
        this.isBusy = true;
        const promise = this.$http({
            method: 'DELETE',
            url: url,
            data: this.ammaFileData
        });
        promise.then((response)=> {
            this.displaySuccessMessage('Deleted file: ' + file);
            this.isBusy = false;
            this.getFiles();
        }, (response) => {
            this.displayErrorMessage('Error while deleting the file: ' + file);
            this.isBusy = false;
            this.getFiles();
        });


    }

    saveFiles(next = null) {
        this.isBusy = true;
        const url = this.resolveUrl(this.ammaFileSaveUrl);
        const promise = this.$http({
            method: 'GET',
            url: url,
            data: this.ammaFileData
        });
        promise.then((response)=> {

            this.isBusy = false;
            if (next) {
                next();
            } else {
                this.displaySuccessMessage('Saved files');
            }
        }, (response) => {
            this.isBusy = false;
            if (next) {
                next(response.data.message);
            } else {
                this.displayErrorMessage(response.data.message);
            }
        });
    }

    viewFile(name:string) {
        return this.resolveUrl(this.ammaFileViewBaseUrl, {file: name});
    };

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
        angular.forEach(this.listFiles, (file)=> {
            temp.push(this.formattedFile(file));
        });
        return temp;
    };

    formattedFile(file) {
        return {
            title: file,
            urlFull: this.viewFile(file)
        };
    }

}