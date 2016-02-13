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
        template: '<button class="k-button" ng-click="userMainController.showDialog($event, dataItem)" >Edit</button>'
      }]

    }

  ]
};
