import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-client-bar',
  templateUrl: './add-client-bar.component.html',
  styleUrls: ['./add-client-bar.component.scss']
})
export class AddClientBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  openAddClientComponent(){
    this.router.navigate(['/dashboard/addClient']);
  }
}
