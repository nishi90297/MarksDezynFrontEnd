import {RequestRoom} from './RequestRoom';
import { RequestRoomItem } from './RequestRoomItem';

export class RequirementFormRequest{
    public propertyType:String = "";
    public propertyAge:String = "";
    public budget: String ="";
    public areaSize:String = "";
    public livingRoom:RequestRoom[];
    public kitchen:RequestRoom[];
    public bedRoom:RequestRoom[];
    public bathRoom:RequestRoom[]

    constructor() {
        let reqRoomItem = new RequestRoomItem()
        let reqRoom = new RequestRoom()

        this.propertyType = "";
        this.propertyAge = "";
        this.budget = "";
        this.areaSize = "";
        this.livingRoom = [reqRoom]
        this.kitchen = [reqRoom]
        this.bedRoom = [reqRoom]
        this.bathRoom = [reqRoom]
    }
}