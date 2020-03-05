import {FurnitureOptionsDetails} from './FurnitureOptionDetails';

export class FurnitureOptions {
    public label: String;
    public options: FurnitureOptionsDetails[];
    public type: String;

    constructor() {
      const local = new FurnitureOptionsDetails('')
      this.label = ''
      this.type = ''
      this.options = [local]
    }
}
