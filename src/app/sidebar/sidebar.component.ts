import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon: 'nc-bank',       class: '' , role: 'ROLE_PRESALES'},
    // { path: '/dashboard/allClientsList',     title: 'All Client List',         icon:'nc-bank',       class: '' , role:[]},
    { path: '/dashboard/meetings',     title: 'Meetings | Pre-sales',         icon: 'nc-badge',       class: '' , role: 'ROLE_PRESALES'},
    { path: '/dashboard/designerMeetings',     title: 'Meetings | Designer',         icon: 'nc-badge',       class: '' , role: 'ROLE_DESIGNER' },
    { path: '/dashboard/designerClientMet',     title: 'Client Met',         icon: ' nc-bell-55',       class: '', role: 'ROLE_DESIGNER' },
    // { path: '/dashboard/addClient',         title: 'Add Client',             icon:'nc-diamond',    class: '' , role:""},
    { path: '/dashboard/designQuotation', title: 'Design Quotation',     icon: 'nc-paper',    class: '' , role: ''},
    { path: '/dashboard/requirementForm',          title: 'Requirement Form',      icon: 'nc-single-copy-04',  class: '' , role: ''},
    // { path: '/dashboard/user',         title: 'User Profile',        icon:'nc-single-02',    class: '', role: "ROLE_DESIGNER" },
    // { path: '/dashboard/profile',          title: 'Profile',      icon: 'nc-tile-56',  class: '' , role: 'ROLE_DESIGNER'},
    { path: '/adminDashboard/', title: 'Admin Dashboard',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/preSales', title: 'Pre Sales',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/team', title: 'Team',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/onBoardClients', title: 'On Board Clients',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/allClients', title: 'All Clients',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/payments', title: 'Payments',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/idJourney', title: 'ID Journey',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/manuals', title: 'Manuals',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/boqTool', title: 'BOQ Tool',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/rForm', title: 'R Form',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    { path: '/dashboard/teamStructure', title: 'Team Structure',     icon: 'nc-paper',    class: '' , role: 'ROLE_MANAGER'},
    
];

@Component({
    moduleId: module.id,
  // tslint:disable-next-line:component-selector
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        if (localStorage.getItem('role') === 'ROLE_PRESALES') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_PRESALES");
        } else if (localStorage.getItem('role') === 'ROLE_DESIGNER') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_DESIGNER");
        } else if (localStorage.getItem('role') === 'ROLE_TL') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_TL');
        } else if (localStorage.getItem('role') === 'ROLE_MANAGER') {
            this.menuItems = ROUTES.filter(menuItem => menuItem.role === 'ROLE_MANAGER');
        }

    }
}
