import * as timeTableActions from './time-table.actions';
import {TimeTableModal} from '../time-table.modal';
import {TimeTableDay} from '../time-table-day.modal';

export interface State {
  timetable: TimeTableModal;
}
const initialState: State = {
  /*timetable: new TimeTableModal([
    [
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons')
    ],
    [
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons')
    ],
    [
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons')
    ],
    [
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons')
    ],
    [
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(false, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons'),
      new TimeTableDay(true, 'Mr.Atif Ishaq', 'Room-4', 'Compiler Cons')
    ]
  ])*/
  timetable: null
};

export function TimeTableReducer(
  state = initialState,
  action: timeTableActions.timeTableActions) {
  switch (action.type) {
    case timeTableActions.STORE_TIME_TABLE:
      return {
        ...state,
        timetable: action.payload
      };
    default:
      return state;
  }
}
