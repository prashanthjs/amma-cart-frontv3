export const menu = [
    {
        name: 'MENU.WHITELABEL.WHITELABEL-MODULE',
        icon: 'zmdi zmdi-home',
        type: 'dropdown',
        priority: 1.1,
        children: [
            {
                name: 'MENU.WHITELABEL.MANAGE-WHITELABEL',
                state: 'triangular.admin-default.whitelabel',
                type: 'link'
            },
            {
                name: 'MENU.WHITELABEL.CREATE-WHITELABEL',
                state: 'triangular.admin-default.whitelabel-create',
                type: 'link'
            }

        ]
    }
];
