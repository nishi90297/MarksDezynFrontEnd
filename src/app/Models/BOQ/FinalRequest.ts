import {OnSiteResponse} from '../OnSiteResponse';
import {FurnitureResponse} from '../FurnitureResponse';
import {ModularResponse} from '../ModularResponse';

export class FinalRequestBOQ {
  public onsite: OnSiteResponse[];
  public rooms: [{
    furniture: FurnitureResponse[],
    modular: ModularResponse[]
  }];
  constructor() {
    this.onsite = [];
    this.rooms = [{
      furniture : [],
      modular: []
    }]
  }
}
