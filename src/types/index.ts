export interface ICardTask {
  uid: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface ISearch {
  data: IdataSearch[];
}

export interface IPropsModalAdd {
  title: string;
  visible: boolean;
  data?: ICardTask;
  modalBackdropClicked(): void;
}

export interface IdataSearch {
  title: string;
  status: TaskStatus;
}
export enum TaskStatus {
  PENDING = "PENDING",
  TERMINATED = "TERMINATED",
}
