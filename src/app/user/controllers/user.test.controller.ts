export class UserTestController {

  public message:string;
  public status:string = 'idle';
  public fileList:any;
  /* @ngInject */
  constructor(public $timeout, public $mdToast) {
    this.message = 'hi this';
  }

  upload = ($files)=> {
    if ($files !== null && $files.length > 0) {
      this.fileList = $files;
      console.log($files);

      this.uploadStarted();

      this.$timeout(this.uploadComplete, 4000);
    }
  };

  uploadStarted = () => {
    this.status = 'uploading';
  };

  uploadComplete = () => {
    this.status = 'complete';
    var message = 'Thanks for ';
    for (var file in this.fileList) {
      message += this.fileList[file].name + ' ';
    }
    this.$mdToast.show({
      template: '<md-toast><span flex>' + message + '</span></md-toast>',
      position: 'bottom right',
      hideDelay: 5000
    });

    this.$timeout(this.uploadReset, 3000);
  };

  uploadReset = ()=> {
    this.status = 'idle';
  };


}
