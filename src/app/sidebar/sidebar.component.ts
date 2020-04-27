import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export const ROUTES: RouteInfo[] = [

    //PRESALES
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' , role: 'ROLE_PRESALES'},
    { path: '/dashboard/meetings',     title: 'Meetings',         icon: 'nc-badge',       class: '' , role: 'ROLE_PRESALES'},

    //DESIGNER
    // { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' , role: 'ROLE_DESIGNER'},
    { path: '/dashboard/meetings',     title: 'Meetings',         icon: 'nc-badge',       class: '' , role: 'ROLE_DESIGNER' },
    { path: '/dashboard/designerClientMet',     title: 'Client Met',         icon: ' nc-bell-55',       class: '', role: 'ROLE_DESIGNER' },

    //TEAM LEAD
    { path: '/dashboard', title: 'Dashboard',     icon: 'nc-paper',    class: '' , role: 'ROLE_TL'},
    
    //MANAGER
    { path: '/dashboard', title: 'Dashboard',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/presales', title: 'PreSales',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/team', title: 'Team',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/onBoardClients', title: 'On Board Clients',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/allClients', title: 'All Clients',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/payments', title: 'Payments',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/idJourney', title: 'ID Journey',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/manuals', title: 'Manuals',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/boqTool', title: 'BOQ Tool',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/rForm', title: 'R Form',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    // { path: '/dashboard/teamStructure', title: 'Team Structure',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        if (localStorage.getItem('role') === 'ROLE_PRESALES') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_PRESALES');
        } else if (localStorage.getItem('role') === 'ROLE_DESIGNER') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_DESIGNER');
        } else if (localStorage.getItem('role') === 'ROLE_TL') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_TL');
        } else if (localStorage.getItem('role') === 'ROLE_MANAGER') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_MANAGER');
        }

    }
}
