export class UserService {

    private apiConfig;
    private userImageBasePath;

    /** @ngInject */
    constructor(API_CONFIG, USER_IMAGE_BASE_PATH) {
        this.apiConfig = API_CONFIG;
        this.userImageBasePath = USER_IMAGE_BASE_PATH;
    }

    getUserImagePath(userId, image) {
       return this.apiConfig.url + this.userImageBasePath + userId + '/' + image;
    }

}
