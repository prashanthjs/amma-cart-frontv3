export const menu = [
    {
        name: 'MENU.CATEGORY.CATEGORY-MODULE',
        icon: 'zmdi zmdi-home',
        type: 'dropdown',
        priority: 1.1,
        children: [
            {
                name: 'MENU.CATEGORY.MANAGE-CATEGORY',
                state: 'amma.admin-default.category',
                type: 'link'
            },
            {
                name: 'MENU.CATEGORY.CREATE-CATEGORY',
                state: 'amma.admin-default.category-create',
                type: 'link'
            }

        ]
    }
];
