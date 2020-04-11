export class OnSiteResponse{
    id: number=0;
    nos: number=0;
    length: number=0;
    height: number=0;
    width: number=0;
    total: number=0;

    constructor();
    constructor(id: number);
    constructor(id?: number) {
        this.id = id;
    }
    
}