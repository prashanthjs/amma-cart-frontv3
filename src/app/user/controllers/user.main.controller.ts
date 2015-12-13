import {UserGridService} from '../services/user.grid.service';
import {IAmmaTab} from "../../amma-util/tabs/amma-tabs.service";
export class UserMainController {

  public message:string;
  public userGridOptions:{};
  private $mdDialog;
  private $mdMedia;
  public tabs:IAmmaTab[];
  public dataItem={_id:1};
  /* @ngInject */
  constructor(UserGridService:UserGridService, $mdDialog:any, $mdMedia) {
    this.userGridOptions = UserGridService.gridOptions;
    this.$mdDialog = $mdDialog;
    this.$mdMedia = $mdMedia;

    this.tabs = [
      {
        title: 'hi',
        templateUrl: 'app/user/views/test1.html',
        priority: 10001,
        data:{
          'userTestController.message': 'test controller 1'
        }

      },
      {
        title: 'h3',
        templateUrl: 'app/user/views/test2.html',
        priority: 0,
        data:{
          'userTestController1.message': 'test controller 2'
        }
      }
    ];

  }

  editButton(dataItem) {

  }

  showDialog($event, dataItem) {
    var _this = this;
    this.$mdDialog.show({
      parent: angular.element(document.body),
      targetEvent: $event,
      templateUrl: 'app/user/views/user.create.html',
      locals: {
        dataItem: dataItem
      },
      controller: 'UserCreateController',
      controllerAs: 'userCreateController',
      fullscreen: _this.$mdMedia('sm')
    });
  }

}
