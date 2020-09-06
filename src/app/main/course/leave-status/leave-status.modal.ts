import {AbsenteesModel} from "./absenttee.modal";

export class LeaveStatusModal {
  public presents: string;
  public absents: string;
  public absentDetails: AbsenteesModel[];
  constructor(presents: string, absents: string, absentDetails: AbsenteesModel[]) {
    this.presents = presents;
    this.absents = absents;
    this.absentDetails = absentDetails;
  }
}
