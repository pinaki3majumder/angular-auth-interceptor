import { Component, OnInit } from '@angular/core';
import { TimerComponent } from "../../shared/components/timer/timer.component";
import { StorageDataService } from '../../core/services/storage-data.service';
import { TimerService } from '../../shared/components/timer/service/timer.service';
import { AuthService } from '../auth/services/auth.service';
import { UserComponent } from "../user/user.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TimerComponent, UserComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private storageDataService: StorageDataService,
    private timerService: TimerService,
  ) { }

  ngOnInit(): void {
    const remainingTime = this.storageDataService.getAccessTokenTime();
    this.timerService.setTargetUnixTime(remainingTime as number);
  }

  logout() {
    this.authService.logout();
  }
}
