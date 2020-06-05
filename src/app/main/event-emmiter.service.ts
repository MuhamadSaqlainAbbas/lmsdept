import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable()
export class AppComponentEventEmitterService {

  // Observable string sources
  public buttonClicked = new Subject<boolean>();
  public message = new Subject<boolean>();

  // Service message commands
  announceClick(message: boolean) {
    console.log('announced with values', message);
    this.buttonClicked.next(message);
  }
}
