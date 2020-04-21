export class ModularResponse {
    id = 0;
    nos = 0;
    length = 0;
    height = 0;
    width = 0;
    quantity = 0;
    total = 0;

    constructor();
    constructor(id: number);
    constructor(id?: number) {
        this.id = id;
    }

}
