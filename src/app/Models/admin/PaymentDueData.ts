export class PaymentDueData {
  public id: number;
  public email: String;
  public name:  String;
  public mobile: String;
  public city: String;
  public address: String;
  public scope: String;
  public package:  String;
  public assignedTo: String;
  public assignedToId:  number;

  constructor() {
    this.id = 0;
    this.email = '';
    this.name = '';
    this.mobile = '';
    this.city = '';
    this.address = '';
    this.scope = '';
    this.package = '';
    this.assignedTo = '';
    this.assignedToId = 0;

  }
}
