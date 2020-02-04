import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DesignQuotationServiceService, DesignQuotation, Design } from 'app/Services/design-quotation-service.service';
import { Router } from '@angular/router';

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

  constructor(private designQuotationService: DesignQuotationServiceService, private router: Router){}
  ngOnInit() {
  }

  submitDesignQuotationForm(form: NgForm){

  this.designQuotation = {design: [{ roomType: this.roomNames[0], count: form.value.bedRoom},
                                  { roomType: this.roomNames[1], count: form.value.bathRoom },
                                  { roomType: this.roomNames[2], count: form.value.kitchen },
                                  { roomType: this.roomNames[3], count: form.value.livingRoom}
                                ],
                        view3D: form.value.view3D,
                        adhocCharges: form.value.adhocCharges
                        };
    console.log(this.designQuotation)
    this.designQuotationService.generateDesignQuotationForm(this.designQuotation).subscribe(
      responseStatus => {
        this.status = responseStatus.toString();
      }
    )
  }
}
