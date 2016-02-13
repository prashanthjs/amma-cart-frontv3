import {IAmmaTab} from '../tabs/amma-tabs.service';
import {AmmaTabsService} from '../tabs/amma-tabs.service';

export interface IScope extends ng.IScope {
    ammaFileUploadUrl:string;
    ammaFileDeleteUrl?: string;
    ammaFileTokenUrl:string;
    ammaFileListUrl?:string;
    ammaFileData?:{};
    ammaFileKey?:string;
    ammaFileViewBaseUrl?:string;
    ammaFileSaveUrl?: string;
    viewFile: any;
}

export interface IResponse {
    data:{
        token: string
        files:string[];
    };
}

/** @ngInject */
export function AmmaFileUploadDirective():ng.IDirective {
    return {
        restrict: 'E',
        scope: {
            ammaFileUploadUrl: '@',
            ammaFileDeleteUrl: '@',
            ammaFileListUrl: '@',
            ammaFileData: '=',
            ammaFileKey: '@',
            ammaFileTokenUrl: '@',
            ammaFileViewBaseUrl: '@',
            ammaFileSaveUrl: '@'
        },
        templateUrl: 'app/amma-util/views/amma-file-upload.html',
        controller: AmmaFileUploadController,
        controllerAs: 'vm'
    };

}

/** @ngInject */
export class AmmaFileUploadController {

    public files:any[];
    public errorFiles:any[];
    public isBusy:boolean = false;
    public token:string = '';

    public listFiles:any[];

    public ammaFileUploadUrl:string;
    public ammaFileDeleteUrl:string;
    public ammaFileListUrl:string;
    public ammaFileTokenUrl:string;
    public ammaFileData:{};
    public ammaFileKey:string;
    public ammaFileViewBaseUrl:string;
    public ammaFileSaveUrl: string;

    constructor(private $scope:IScope, private Upload, private $timeout, private $log:ng.ILogService, private $http:ng.IHttpService, private $mdToast) {

        this.ammaFileUploadUrl = $scope.ammaFileUploadUrl || '';
        this.ammaFileDeleteUrl = $scope.ammaFileDeleteUrl || this.ammaFileUploadUrl;
        this.ammaFileListUrl = $scope.ammaFileListUrl || '';
        this.ammaFileTokenUrl = $scope.ammaFileTokenUrl || '';
        this.ammaFileData = $scope.ammaFileData || {};
        this.ammaFileKey = $scope.ammaFileKey || 'file';
        this.ammaFileViewBaseUrl = $scope.ammaFileViewBaseUrl || '';
        this.ammaFileSaveUrl = $scope.ammaFileSaveUrl || '';
        this.createToken();
    }

    createToken = ()=> {
        if (this.ammaFileTokenUrl) {
            this.isBusy = true;
            let promise = this.$http({
                method: 'GET',
                url: this.ammaFileTokenUrl,
                data: this.ammaFileData
            });
            promise.then((response:IResponse)=> {
                this.isBusy = false;
                this.token = response.data.token;
                this.listFiles = response.data.files;
            }, (response) => {
                this.isBusy = false;
                this.token = '';
            });
        }
    };

    uploadFiles = (files, errorFiles)=> {

        angular.forEach(errorFiles, (errorFile)=> {
            this.displayErrorMessage('Error:' + errorFile.name);
        });
        if (this.ammaFileUploadUrl) {
            let uploadUrl = this.ammaFileUploadUrl.replace('{token}', this.token);
            this.isBusy = true;
            angular.forEach(files, (file:any) => {
                let temp = {};
                temp[this.ammaFileKey] = file;
                temp['data'] = this.ammaFileData;
                file.isBusy = true;
                file.upload = this.Upload.upload({
                    url: uploadUrl,
                    data: temp
                }).then((response)  => {
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
        }
    };

    updateStatus = (files:any[]) => {
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


    getFiles = ()=> {
        if (this.ammaFileListUrl) {
            this.isBusy = true;
            let listUrl = this.ammaFileListUrl.replace('{token}', this.token);
            let promise = this.$http({
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
            });
        }
    };

    viewFile = (name:string) => {
        if (this.ammaFileViewBaseUrl) {
            let url = this.ammaFileViewBaseUrl.replace('{token}', this.token);
            url = url.replace('{file}', name);
            return url;
        }
    };

    deleteFile = (file:string) => {
        if(this.ammaFileDeleteUrl){
            this.isBusy = true;
            let url = this.ammaFileDeleteUrl.replace('{token}', this.token);
            url = url.replace('{file}', file);
            let promise = this.$http({
                method: 'DELETE',
                url: url,
                data: this.ammaFileData
            });
            promise.then((response)=> {
                this.displaySuccessMessage('Deleted file: '+file);
                this.isBusy = false;
                this.getFiles();
            }, (response) => {
                this.displaySuccessMessage('Error while deleting the file: '+file);
                this.isBusy = false;
                this.getFiles();
            });
        }

    };


    saveFiles = (file:string) => {
        if(this.ammaFileSaveUrl){
            this.isBusy = true;
            let url = this.ammaFileSaveUrl.replace('{token}', this.token);
            let promise = this.$http({
                method: 'GET',
                url: url,
                data: this.ammaFileData
            });
            promise.then((response)=> {
                this.displaySuccessMessage('Saved files');
                this.isBusy = false;
            }, (response) => {
                this.displaySuccessMessage('Error while saveing');
                this.isBusy = false;
            });
        }

    };

    displayErrorMessage = (message)  => {
        this.$mdToast.show({
            template: '<md-toast><span flex>Error: ' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    };

    displaySuccessMessage = (message)  => {
        this.$mdToast.show({
            template: '<md-toast><span flex>' + message + '</span></md-toast>',
            position: 'bottom right',
            hideDelay: 5000
        });
    };

}
