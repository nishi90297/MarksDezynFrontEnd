import {FurnitureRequirementFormData} from '../FurnitureRequirementFormData';
import {ModularRequirementFormData} from '../ModularRequirementFormData';
import {FurnitureResponse} from '../FurnitureResponse';
import {ModularResponse} from '../ModularResponse';

export class ClientRoom {
  public name: String;
  public type: String;
  public id: number;

  public searchFurnitureBy: String;
  public hasFurniture: boolean;
  public furnitureRows: FurnitureRequirementFormData[];
  public selectedFurnitureEntity: String;
  public furnitureTotalAmount: number;
  public furnitureResponseArray: FurnitureResponse[];

  public searchModularBy: String;
  public hasModular: boolean;
  public selectedModularEntity: String;
  public modularRows: ModularRequirementFormData[];
  public modularTotalAmount: number;
  public modularResponseArray: ModularResponse[];
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
    this.selectedModularEntity = '';
    this.modularTotalAmount = 0;
    this.modularResponseArray = [];
  }
}
