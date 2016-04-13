export const StoreGridOptions = {
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
            title: 'Status',
            template: '<md-switch class="md-primary margin-0" ng-model="dataItem.isActive" aria-label="isActive?" ng-disabled="true"/>'

        },
        {
            command: [{
                text: '',
                template: '<div ng-include="\'app/store/views/helper/list-command.html\'"></div>'
            }]

        }

    ]
};


