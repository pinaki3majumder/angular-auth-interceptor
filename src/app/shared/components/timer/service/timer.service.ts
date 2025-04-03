import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private targetUnixTimeSource = new BehaviorSubject<number | null>(null);
  targetUnixTime$ = this.targetUnixTimeSource.asObservable();

  setTargetUnixTime(value: number): void {
    this.targetUnixTimeSource.next(value);
  }
}
