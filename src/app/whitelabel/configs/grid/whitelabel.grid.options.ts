export const WhitelabelGridOptions = {
    dataSource: {
        pageSize: 20,
        serverPaging: true,
        serverSorting: true,
        serverFiltering: true,
        schema: {
            model: {
                fields: {
                    isActive: {type: "boolean"}
                }
            }
        }
    },
    sortable: true,
    pageable: true,
    filterable: true,
    columns: [
        {
            field: '_id',
            title: 'Name'
        },
        {
            field: 'title',
            title: 'Title'
        },
        {
            field: 'email',
            title: 'Email'
        },
        {
            field: 'contactNumber',
            title: 'Contact Number'
        },
        {
            field: 'address.town',
            title: 'Location'

        },
        {
            field: 'isActive',
            title: 'Is Active?'

        },
        {
            command: [{
                text: '',
                template: '<div layout="row"> ' +
                '<md-button  class="md-fab md-mini md-primary" aria-label="View">' +
                '<a ui-sref="triangular.admin-default.whitelabel-view({id: dataItem._id})"><md-icon md-font-icon="fa fa-eye"></md-icon></a>' +
                '</md-button> ' +
                '<md-button  class="md-fab md-mini md-accent" aria-label="Edit" >' +
                '<a ui-sref="triangular.admin-default.whitelabel-view({id: dataItem._id})"><md-icon md-font-icon="fa fa-pencil"></md-icon></a>' +
                '</md-button> ' +
                '<md-button  class="md-fab md-mini md-warn" ng-click="whitelabelListController.deleteItem(dataItem, $event)" aria-label="Delete">' +
                '<md-icon md-font-icon="fa fa-times"></md-icon>' +
                '</md-button>' +
                '</div>'
            }]

        }

    ]
};
