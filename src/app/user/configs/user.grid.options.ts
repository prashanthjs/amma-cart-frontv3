export var UserGridOptions = {
  dataSource: {
    pageSize: 20,
    serverPaging: true,
    serverSorting: true,
    serverFiltering: true
  },
  sortable: true,
  pageable: true,
  filterable: true,
  columns: [{
    field: '_id',
    title: 'ID'
  }, {
    field: 'email',
    title: 'Email'
  },

    {
      field: 'name.firstName',
      title: 'First Name'
    },
    {
      field: 'name.lastName',
      title: 'Last Name'
    },
    {
      command: [{
        text: '',
        template: '<div layout="row"> ' +
        '<md-button  class="md-fab md-mini md-primary" ui-href="/user/{{dataItem._id}}" >' +
        '<md-icon md-font-icon="fa fa-pencil"></md-icon>' +
        '</md-button> ' +
        '<md-button  class="md-fab md-mini md-warn" ng-click="userIndexController.deleteItem(dataItem)" >' +
          '<md-icon md-font-icon="fa fa-times"></md-icon>' +
        '</md-button>' +
        '</div>'
      }]

    }

  ]
};
