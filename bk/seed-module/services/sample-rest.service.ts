/* @ngInject */
export function SampleRestService(Restangular) {
  Restangular.all('users').getList()  // GET: /users
    .then(function(users) {
     console.log(users[0].get().then(function(user){
       console.log(user);
     }));
    },function(response){
      console.log(response);
    });

}
