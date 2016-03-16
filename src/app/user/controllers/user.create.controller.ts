export class UserCreateController {


    public images = [];
    public $mdDialog;
    /* @ngInject */
    constructor($mdDialog, triBreadcrumbsService) {

        this.$mdDialog = $mdDialog;
        var numberOfImages = 20;
        for (var i = 0; i < numberOfImages; i++) {
            this.images.push(this.randomImage('Photo ' + (i + 1)));
        }

        triBreadcrumbsService.addCrumb({name:'User'});
        triBreadcrumbsService.addCrumb({name:'testing'});
    }


    randomImage(title) {
        var loremPixelCategories = ['abstract', 'city', 'people', 'nature', 'food', 'fashion', 'nightlife'];

        var randImage = Math.floor((Math.random() * 10) + 1);
        var randomCategory = loremPixelCategories[Math.floor((Math.random() * (loremPixelCategories.length - 1)) + 1)];

        var width = [300, 640];
        var height = [225, 480];

        var image = {
            url: 'http://lorempixel.com/',
            urlFull: 'http://lorempixel.com/',
            title: title,
            rowspan: 2,
            colspan: 2
        };
        image.url += width[0] + '/' + height[0];
        image.urlFull += width[1] + '/' + height[1];


        image.url += '/' + randomCategory + '/' + randImage;
        image.urlFull += '/' + randomCategory + '/' + randImage;

        return image;
    }


    openImage(images, image, $event) {
        this.$mdDialog.show({
            controller: 'UserGalleryController',
            controllerAs: 'userGalleryController',
            templateUrl: 'app/user/views/user.gallery.html',
            clickOutsideToClose: true,
            focusOnOpen: false,
            targetEvent: $event,
            locals: {
                images:images,
                image: image
            }
        });
    }

}
