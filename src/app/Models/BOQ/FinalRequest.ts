import {OnSiteResponse} from '../OnSiteResponse';
import {FurnitureResponse} from '../FurnitureResponse';
import {ModularResponse} from '../ModularResponse';

export class FinalRequestBOQ {
  public clientId: Number;
  public onsite: OnSiteResponse[];
  public rooms: FinalRequestBOQRooms[];
  constructor() {
    this.clientId = 0;
    this.onsite = [];
    this.rooms = [];
  }
}
export class FinalRequestBOQRooms {
  name: String;
  type: String;
  furniture: FurnitureResponse[];
  modular: ModularResponse[];
  constructor() {
    this.name = '';
    this.type = '';
    this.furniture = [];
    this.modular = [];
  }
}
