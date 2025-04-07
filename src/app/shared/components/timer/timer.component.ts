import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReLoginService } from '../../../core/services/re-login.service';
import { TimerService } from './service/timer.service';
import { AuthService } from '../../../features/auth/services/auth.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent implements OnInit, OnDestroy {
  targetUnixTime: number | null = null;
  private subscription: Subscription = new Subscription();
  remainingTime: string = '00:00:00';
  intervalId: any;

  constructor(
    private authService: AuthService,
    private reLoginService: ReLoginService,
    private timerService: TimerService
  ) { }

  ngOnInit(): void {
    // Subscribe to TimerService to get updates
    this.subscription = this.timerService.targetUnixTime$.subscribe(time => {
      if (time) {
        this.targetUnixTime = time;
        this.startCountdown();
      }
    });
  }

  startCountdown(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    this.intervalId = setInterval(() => {
      const currentTime = Math.floor(Date.now() / 1000); // Convert to Unix timestamp
      const timeLeft = this.targetUnixTime ? this.targetUnixTime - currentTime : 0;    

      if (timeLeft <= 0) {
        clearInterval(this.intervalId);

        if (confirm("You Have Been Idle! Stay?") == true) {
          this.reLoginService.reLogin();
        } else {
          this.authService.logout();
        }
      } else {
        this.remainingTime = this.formatTime(timeLeft);
      }
    }, 1000);
  }

  formatTime(seconds: number): string {
    const hrs = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}