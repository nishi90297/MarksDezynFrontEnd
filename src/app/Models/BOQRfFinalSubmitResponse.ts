import { OnSiteResponse } from './OnSiteResponse';
import { FurnitureResponse } from './FurnitureResponse';
import { ModularResponse } from './ModularResponse';

export class BOQRfFinalSubmitResponse {
  onSiteResponseArray: OnSiteResponse[];
  onFurnitureResponseArray: FurnitureResponse[];
  onModularResponseArray: ModularResponse[];

  constructor(){
    this.onSiteResponseArray=[];
    this.onFurnitureResponseArray=[];
    this.onModularResponseArray=[];
  };
}