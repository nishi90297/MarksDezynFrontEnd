export interface ClientTasksApiResponse {
  success: true,
  data: ClientTask[]
}

export class ClientTask {
  public id: number;
  public client_id: number;
  public task_name: String;
  public start_date: String;
  public end_date: String;
  public status: String;
  public delay: number;
  public task_id: number;
  public created: String;
  public updated: String;
  public admin_id: number;

  constructor() {
    this.id = 0;
    this.client_id = 0;
    this.task_name = '';
    this.start_date = '';
    this.end_date = '';
    this.status = '';
    this.delay = 0;
    this.task_id = 0;
    this.created = '';
    this.updated = '';
    this.admin_id = 0;
  }
}
