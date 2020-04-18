import { OnSiteResponse } from './OnSiteResponse';
import { FurnitureResponse } from './FurnitureResponse';
import { ModularResponse } from './ModularResponse';

export class BOQRfFinalSubmitResponse {
  onsite: OnSiteResponse[];
  furniture: FurnitureResponse[];
  modular: ModularResponse[];
  clientId: Number;
  constructor(){
    this.onsite = [];
    this.furniture = [];
    this.modular = [];
    this.clientId = 0;
  };
}
