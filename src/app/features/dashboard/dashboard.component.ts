import { Component, OnInit } from '@angular/core';
import { TimerComponent } from "../../shared/components/timer/timer.component";
import { LogoutService } from '../../core/services/logout.service';
import { StorageDataService } from '../../core/services/storage-data.service';
import { TimerService } from '../../shared/components/timer/service/timer.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TimerComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    private logoutService: LogoutService,
    private storageDataService: StorageDataService,
    private timerService: TimerService,
  ) {}

  ngOnInit(): void {
    const remainingTime = this.storageDataService.getAccessTokenTime();
    this.timerService.setTargetUnixTime(remainingTime);
  }

  logout() {
    this.logoutService.logout();
  }
}
