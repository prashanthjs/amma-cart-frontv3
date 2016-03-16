export interface IScope extends ng.IScope {
    ammaFileUploadUrl:string;
    ammaFileDeleteUrl?: string;
    ammaFileTokenUrl:string;
    ammaFileListUrl?:string;
    ammaFileData?:{};
    ammaFileKey?:string;
    ammaFileViewBaseUrl?:string;
    ammaFileSaveUrl?: string;
}

export interface IResponse {
    data:{
        token: string
        files:string[];
    };
}

export class AmmaFileUploadController {

    public files:any[];
    public errorFiles:any[];
    public isBusy:boolean = false;

    public listFiles:any[];

    public baseUrl = 'http://localhost:5555';

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
    protected $log:ng.ILogService;
    protected $http:ng.IHttpService;
    protected $mdToast;
    protected $mdDialog;

    public data = {};

    /* @ngInject */
    constructor(Upload, $timeout, $log:ng.ILogService, $http:ng.IHttpService, $mdToast, $mdDialog) {
        this.Upload = Upload;
        this.$timeout = $timeout;
        this.$log = $log;
        this.$http = $http;
        this.$mdToast = $mdToast;
        this.$mdDialog = $mdDialog;
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
            this.$log.debug(response);
            this.addData('token', response.data.token);
            this.getFiles();
        }, (response) => {
            this.displayErrorMessage('Cannot retrieve token');
            this.$log.debug(response);
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
                    this.$log.debug(response);
                    this.updateStatus(files);
                });
            }, (response:any) => {
                file.isBusy = false;
                this.displayErrorMessage('Error: ' + file.name);
                this.$log.debug(response);
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
            this.$log.debug(response);
        }, (response) => {
            this.listFiles = [];
            this.isBusy = false;
            this.displayErrorMessage('Could not get the files');
            this.$log.debug(response);
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
            this.$log.debug(response);
        }, (response) => {
            this.displayErrorMessage('Error while deleting the file: ' + file);
            this.$log.debug(response);
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
            this.$log.debug(response);
            if (next) {
                next();
            } else {
                this.displaySuccessMessage('Saved files');
            }
        }, (response) => {
            this.$log.debug(response);
            this.isBusy = false;
            if (next) {
                next('Error while saving');
            } else {
                this.displayErrorMessage('Error while saving');
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

    displayErrorMessage = (message) => {
        this.$mdToast.show({
            template: '<md-toast><span flex>Error: ' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    };

    displaySuccessMessage = (message) => {
        this.$mdToast.show({
            template: '<md-toast><span flex>' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    };
}