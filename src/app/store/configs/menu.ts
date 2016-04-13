export const menu = [
    {
        name: 'MENU.STORE.STORE-MODULE',
        icon: 'zmdi zmdi-home',
        type: 'dropdown',
        priority: 1.1,
        children: [
            {
                name: 'MENU.STORE.MANAGE-STORE',
                state: 'triangular.admin-default.store',
                type: 'link'
            },
            {
                name: 'MENU.STORE.CREATE-STORE',
                state: 'triangular.admin-default.store-create',
                type: 'link'
            }

        ]
    }
];
