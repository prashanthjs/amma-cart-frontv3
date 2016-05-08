export const RoleGridOptions = {
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
            title: 'Role'
        },
        {
            command: [{
                text: '',
                template: '<div ng-include="\'app/role/views/helper/list-command.html\'"></div>'
            }]

        }

    ]
};
