import {ActionReducerMap} from '@ngrx/store';
import * as fromTimeTable from '../main/time-table/store/time-table.reducer';

export interface AppState {
  fromTimeTable: fromTimeTable.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  fromTimeTable: fromTimeTable.TimeTableReducer,
};
