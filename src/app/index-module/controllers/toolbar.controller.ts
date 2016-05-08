import {AuthService} from "../../auth/services/auth.service";
import {UserService} from "../../user/services/user.service";
export class ToolbarController {

    private $scope;
    private $injector;
    private $rootScope;
    private $mdMedia;
    private $state;
    private $element;
    private $filter;
    private $mdUtil;
    private $mdSidenav;
    private $mdToast;
    private $timeout;
    private $document;
    private triBreadcrumbsService;
    private triSettings;
    private triLayout;
    public isFullScreen = false;
    public fullScreenIcon = 'zmdi zmdi-fullscreen';
    public emailNew = false;
    public breadcrumbs;
    public languages;
    public authService:AuthService;
    public userPic;
    private userService:UserService;

    public user;
    /* @ngInject */
    constructor($scope, $injector, $rootScope, $mdMedia, $state, $element, $filter, $mdUtil, $mdSidenav, $mdToast,
                $timeout, $document, triBreadcrumbsService, triSettings, triLayout, authService, userService) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$rootScope = $rootScope;
        this.$mdMedia = $mdMedia;
        this.$state = $state;
        this.$element = $element;
        this.$filter = $filter;
        this.$mdUtil = $mdUtil;
        this.$mdSidenav = $mdSidenav;
        this.$mdToast = $mdToast;
        this.$timeout = $timeout;
        this.$document = $document;
        this.triBreadcrumbsService = triBreadcrumbsService;
        this.triSettings = triSettings;
        this.triLayout = triLayout;
        this.breadcrumbs = triBreadcrumbsService.breadcrumbs;
        this.languages = triSettings.languages;

        this.authService = authService;
        this.userService = userService;
        this.user = null;
        let promise = this.authService.getUser();
        if (promise) {
            promise.then((user)=> {
                this.user = user;
            });
        }

        let userProfilePic = this.authService.getUserProfilePic();
        this.userPic = null;
        if (userProfilePic) {
            userProfilePic.then((pics)=> {
                if (pics.files.length) {
                    this.userPic = this.userService.getUserImagePath(this.authService.getUserId(), pics.files[0]);
                }
            })
        }


        $scope.$on('newMailNotification', () => {
            this.emailNew = true;
        });
    }

    openSideNav(navID) {
        this.$mdUtil.debounce(() => {
            this.$mdSidenav(navID).toggle();
        }, 300)();
    }

    switchLanguage(languageCode) {
        if (this.$injector.has('$translate')) {
            var $translate = this.$injector.get('$translate');
            $translate.use(languageCode)
                .then(() => {
                    this.$mdToast.show(
                        this.$mdToast.simple()
                            .content(this.$filter('triTranslate')('Language Changed'))
                            .position('bottom right')
                            .hideDelay(500)
                    );
                    this.$rootScope.$emit('changeTitle');
                });
        }
    }

    hideMenuButton() {
        return this.triLayout.layout.sideMenuSize !== 'hidden' && this.$mdMedia('gt-sm');
    }

    toggleNotificationsTab(tab) {
        this.$rootScope.$broadcast('triSwitchNotificationTab', tab);
        this.openSideNav('notifications');
    }

    toggleFullScreen() {
        this.isFullScreen = !this.isFullScreen;
        this.fullScreenIcon = this.isFullScreen ? 'zmdi zmdi-fullscreen-exit' : 'zmdi zmdi-fullscreen';
        let element:any = Element;
        // more info here: https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
        var doc = this.$document[0];
        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            if (doc.documentElement.requestFullscreen) {
                doc.documentElement.requestFullscreen();
            } else if (doc.documentElement.msRequestFullscreen) {
                doc.documentElement.msRequestFullscreen();
            } else if (doc.documentElement.mozRequestFullScreen) {
                doc.documentElement.mozRequestFullScreen();
            } else if (doc.documentElement.webkitRequestFullscreen) {
                doc.documentElement.webkitRequestFullscreen(element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            } else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            } else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            } else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        }
    }


}