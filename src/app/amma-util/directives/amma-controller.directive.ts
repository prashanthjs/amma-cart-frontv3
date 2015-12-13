export interface IScope extends ng.IScope {
  ammaController:string;
  ammaControllerAs:string;

}
/** @ngInject */
export function AmmaControllerDirective($compile:ng.ICompileService):ng.IDirective {
  return {
    scope: {
      ammaController: '=',
      ammaControllerAs: '='
    },
    restrict: 'A',
    terminal: true,
    priority: 100000,
    link: function (scope:IScope, elem, attrs) {
      let ctrl = scope.ammaController;
      if (ctrl) {
        if (scope.ammaControllerAs) {
          ctrl += ' as ' + scope.ammaControllerAs;
        }
        elem.attr('ng-controller', ctrl);
        elem.removeAttr('amma-controller');
        elem.removeAttr('amma-controller-as');
        $compile(elem.contents())(scope);
      }
    }
  };
}
