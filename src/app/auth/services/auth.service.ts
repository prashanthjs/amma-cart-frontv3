import {AuthRestService} from "./auth.rest.service";
export class AuthService {
    private $window;
    private Restangular;
    private userRestService;
    private authRestService:AuthRestService;
    private $q;

    /** @ngInject */
    constructor($window, Restangular, userRestService, authRestService, $q) {
        this.$window = $window;
        this.Restangular = Restangular;
        this.userRestService = userRestService;
        this.authRestService = authRestService;
        this.$q = $q;

    }

    setUserId(userId) {
        this.$window.sessionStorage.userId = userId;
    }

    getUserId() {
        return this.$window.sessionStorage.userId;
    }

    setToken(token) {
        this.$window.sessionStorage.token = token;
        this.updateRestAuthHeader();

    }

    getToken() {
        return this.$window.sessionStorage.token;
    }


    removeToken() {
        delete this.$window.sessionStorage.token;
        this.updateRestAuthHeader();

    }

    removeUserId() {
        delete this.$window.sessionStorage.userId;
    }

    set(userId, token) {
        this.setUserId(userId);
        this.setToken(token);
    }

    getUser() {
        if (this.getUserId()) {
            return this.userRestService.getById(this.getUserId());
        }
        return null;
    }

    getUserProfilePic() {
        if (this.getUserId()) {
            return this.userRestService.getProfilePics(this.getUserId());
        }
        return null;
    }


    clear() {
        this.removeToken();
        this.removeUserId();
    }

    updateRestAuthHeader() {
        if (this.getToken()) {
            this.Restangular.setDefaultHeaders({Authorization: this.getToken()});
        }
        else {
            this.Restangular.setDefaultHeaders({});
        }
    }

    login(username, password) {
        const defer = this.$q.defer();
        this.authRestService.login(username, password).then((result)=> {
            this.set(username, result.token);
            defer.resolve(result);
        }, (error)=> {
            this.clear();
            defer.reject(error);
        });
        return defer.promise;
    }

    logout() {
        const defer = this.$q.defer();
        this.authRestService.logout().then((result)=> {
            defer.resolve(result);
        }, (error)=> {
            defer.reject(error);
        });
        this.clear();
        return defer.promise;
    }
}
