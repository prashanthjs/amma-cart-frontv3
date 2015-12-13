export class UserCreateController {

  public message:string;
  public tabs;
  constructor(dataItem, $scope, $controller) {
    $scope.message = 'hi';
    $scope.tabs = [
      {
        title: 'hi',
        templateUrl: 'app/user/views/test1.html',
        controller: 'UserTestController'
      },
      {
        title: 'h3',
        templateUrl: 'app/user/views/test2.html',
        controller: 'UserTestController'
      }
    ];
  }

}
