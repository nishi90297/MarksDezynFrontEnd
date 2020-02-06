import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DesignQuotationServiceService, DesignQuotation, Design, DesignQuotationResponse } from 'app/Services/design-quotation-service.service';
import { Router, UrlSegment, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-design-quotation',
  templateUrl: './design-quotation.component.html',
  styleUrls: ['./design-quotation.component.scss']
})
export class DesignQuotationComponent implements OnInit{

  public roomNames:any[]=["bedRoom","bathRoom","kitchen","livingRoom"]
  errorMsg: string;
  status: string;

  designQuotation: DesignQuotation;
  clientId:Number;
  designQuotationResponse:DesignQuotationResponse;
  url: String;
  constructor(private designQuotationService: DesignQuotationServiceService, private router: Router, private route:ActivatedRoute){}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.clientId=params.id;
  })
  }

  submitDesignQuotationForm(form: NgForm){
  this.designQuotation = {design: [{ roomType: this.roomNames[0], count: Number(form.value.bedRoom)},
                                  { roomType: this.roomNames[1], count: Number(form.value.bathRoom)},
                                  { roomType: this.roomNames[2], count: Number(form.value.kitchen) },
                                  { roomType: this.roomNames[3], count: Number(form.value.livingRoom)}
                                ],
                        view3D: Number(form.value.view3D),
                        adhocCharges: form.value.adhocCharges,
                        clientId: Number(this.clientId),  
                        };
    this.designQuotationService.generateDesignQuotationForm(this.designQuotation).subscribe(
      response => { this.designQuotationResponse=response;
        this.url=this.designQuotationResponse.data.url,
        alert("Design Quotation Generated !");
        this.router.navigate([this.url])
      }
    )
  }
}
