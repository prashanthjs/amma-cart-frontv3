export const menu = [
    {
        name: 'MENU.ROLE.ROLE-MODULE',
        icon: 'zmdi zmdi-home',
        type: 'dropdown',
        priority: 1.1,
        children: [
            {
                name: 'MENU.ROLE.MANAGE-ROLE',
                state: 'amma.admin-default.role',
                type: 'link'
            },
            {
                name: 'MENU.ROLE.CREATE-ROLE',
                state: 'amma.admin-default.role-create',
                type: 'link'
            }

        ]
    }
];
