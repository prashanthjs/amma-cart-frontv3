export const UserGridOptions = {
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
            title: 'Username'
        },
        {
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
            field: 'isActive',
            title: 'Status',
            template: '<md-switch class="md-primary" ng-model="dataItem.isActive" aria-label="status" ng-disabled="true"/>'


        },
        {
            command: [{
                text: '',
                template: '<div ng-include="\'app/user/views/helper/list-command.html\'"></div>'
            }]

        }

    ]
};
