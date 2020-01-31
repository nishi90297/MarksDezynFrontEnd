import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-design-quotation',
  templateUrl: './design-quotation.component.html',
  styleUrls: ['./design-quotation.component.scss']
})
export class DesignQuotationComponent implements OnInit{

  public blocks:any[]=[1, 2 , 3 , 4 ];

  ngOnInit() {
    console.log("blockssssssssssssssssss",this.blocks.length)
  }
}
