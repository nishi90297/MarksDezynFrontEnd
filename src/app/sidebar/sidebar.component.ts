import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    { path: '/dashboard/allClientsList',     title: 'All Client List',         icon:'nc-bank',       class: '' },
    { path: '/dashboard/meetings',     title: 'Meetings | Pre-sales',         icon:'nc-bell-55',       class: '' },
    { path: '/dashboard/designerMeetings',     title: 'Meetings | Designer',         icon:'nc-bell-55',       class: '' },
    { path: '/dashboard/designerClientMet',     title: 'Client Met | Designer',         icon:'nc-bell-55',       class: '' },
    { path: '/dashboard/addClient',         title: 'Add Client',             icon:'nc-diamond',    class: '' },
    { path: '/dashboard/designQuotation', title: 'Design Quotation',     icon:'nc-bell-55',    class: '' },
    { path: '/dashboard/requirementForm',          title: 'Requirement Form',      icon:'nc-tile-56',  class: '' },
    { path: '/dashboard/user',         title: 'User Profile',        icon:'nc-single-02',    class: '' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
