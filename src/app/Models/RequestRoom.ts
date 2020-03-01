import {RequestRoomItem} from './RequestRoomItem';

export class RequestRoom{
    public roomName:String = "";
    public items: RequestRoomItem[]

    constructor(){
        let reqRoomItem = new RequestRoomItem()
        
        this.roomName = "";
        this.items = [reqRoomItem];
    }
}