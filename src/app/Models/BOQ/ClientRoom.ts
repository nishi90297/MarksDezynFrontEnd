import {FurnitureRequirementFormData} from '../FurnitureRequirementFormData';
import {ModularRequirementFormData} from '../ModularRequirementFormData';
import {FurnitureResponse} from '../FurnitureResponse';

export class ClientRoom {
  public name: String;
  public type: String;
  public id: number;
  public searchFurnitureBy: String;
  public searchModularBy: String;
  public hasFurniture: boolean;
  public hasModular: boolean;
  public furnitureRows: FurnitureRequirementFormData[];
  public modularRows: ModularRequirementFormData[];
  public selectedFurnitureEntity: String;
  public furnitureTotalAmount: number;
  public furnitureResponseArray: FurnitureResponse[];
  constructor() {
    this.name = '';
    this.type = '';
    this.id = 0;
    this.hasFurniture = false;
    this.hasModular = false;
    this.searchFurnitureBy = 'item_code';
    this.searchModularBy = 'item_code';
    this.furnitureTotalAmount = 0;
    this.furnitureResponseArray = [];
    this.furnitureRows = [];
    this.modularRows = [];
    this.selectedFurnitureEntity = '';
  }
}
