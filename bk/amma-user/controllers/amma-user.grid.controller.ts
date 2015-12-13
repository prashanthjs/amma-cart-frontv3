
export class AmmaUserGridController {

  public message;
  /* @ngInject */
  constructor ($rootScope) {
    this.message = 'prashanth';
    var tabs = {};
    $rootScope.$emit('get-tabs',{
      tabs: tabs
    });
    console.log(tabs);

  }

}
