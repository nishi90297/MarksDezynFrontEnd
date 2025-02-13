
export interface DesignerOnBoardClientsApiResponse {
  success: boolean,
  data: DesignerOnBoardClientsData
}

export interface DesignerOnBoardClientsData {
  allClients: DesignerOnBoardClients[]
}

export class DesignerOnBoardClients {
  public id: Number;
  public name: String;
  public email: String;
  public mobile: String;
  public city: String;
  public projectId: Number;
  public scope_of_work: String;
  public package: String;
  public dosp: String;
  constructor() {
    this.id = 0;
    this.name = '';
    this.email = '';
    this.mobile = '';
    this.city = '';
    this.dosp = '';
    this.projectId = 0;
    this.scope_of_work = '';
    this.package = '';
  }

}
