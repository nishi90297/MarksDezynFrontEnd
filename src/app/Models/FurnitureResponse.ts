export class FurnitureResponse{
    id: number=0;
    nos: number;
    length: number;
    height: number;
    width: number;
    quantity: number;
    total: number;

    constructor();
    constructor(id: number);
    constructor(id?: number) {
        this.id = id;
    }

}
