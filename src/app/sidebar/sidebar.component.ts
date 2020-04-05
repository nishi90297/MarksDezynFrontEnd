import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' , role:"ROLE_PRESALES"},
    // { path: '/dashboard/allClientsList',     title: 'All Client List',         icon:'nc-bank',       class: '' , role:[]},
    { path: '/dashboard/meetings',     title: 'Meetings | Pre-sales',         icon:'nc-bell-55',       class: '' , role:"ROLE_PRESALES"},
    { path: '/dashboard/designerMeetings',     title: 'Meetings | Designer',         icon:'nc-bell-55',       class: '' , role:"ROLE_DESIGNER" },
    { path: '/dashboard/designerClientMet',     title: 'Client Met | Designer',         icon:'nc-bell-55',       class: '', role:"ROLE_DESIGNER" },
    // { path: '/dashboard/addClient',         title: 'Add Client',             icon:'nc-diamond',    class: '' , role:""},
    { path: '/dashboard/designQuotation', title: 'Design Quotation',     icon:'nc-bell-55',    class: '' , role:""},
    { path: '/dashboard/requirementForm',          title: 'Requirement Form',      icon:'nc-tile-56',  class: '' , role:""},
    // { path: '/dashboard/user',         title: 'User Profile',        icon:'nc-single-02',    class: '', role: "ROLE_DESIGNER" },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        if(localStorage.getItem("role")=="ROLE_PRESALES"){
            // this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_PRESALES");
            this.menuItems = ROUTES
        }
        else if(localStorage.getItem("role")=="ROLE_DESIGNER"){
            // this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_DESIGNER");
            this.menuItems = ROUTES
        }
        else if(localStorage.getItem("role")=="ROLE_TL"){
            this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_TL");
        }
        else if(localStorage.getItem("role")=="ROLE_MANAGER"){
            this.menuItems = ROUTES.filter(menuItem => menuItem.role==="ROLE_MANAGER");
        }
        
    }
}
