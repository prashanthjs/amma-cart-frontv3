export const menu = [
    {
        name: 'MENU.USER.USER-MODULE',
        icon: 'zmdi zmdi-home',
        type: 'dropdown',
        priority: 1.1,
        children: [
            {
                name: 'MENU.USER.MANAGE-USER',
                state: 'triangular.admin-default.user',
                type: 'link'
            },
            {
                name: 'MENU.USER.CREATE-USER',
                state: 'triangular.admin-default.user-create',
                type: 'link'
            }

        ]
    }
];
