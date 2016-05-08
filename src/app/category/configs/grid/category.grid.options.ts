export const CategoryGridOptions = {
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
            field: 'parentCategory',
            title: 'Parent category'
        },
        {
            field: 'isActive',
            title: 'Status',
            template: '<md-switch class="md-primary margin-0" ng-model="dataItem.isActive" aria-label="isActive?" ng-disabled="true"/>'

        },
        {
            command: [{
                text: '',
                template: '<div ng-include="\'app/category/views/helper/list-command.html\'"></div>'
            }]

        }

    ]
};


