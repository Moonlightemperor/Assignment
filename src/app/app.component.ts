import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { User } from './models/workout.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  selectedUser: User | null = null;
  allUsers: User[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.initializeData();
    this.loadUsers();
  }

  loadUsers() {
    this.allUsers = this.dataService.getUsers();
  }

  onSelectUser(event: Event) {
    const target = event.target as HTMLSelectElement;
    const user = target.value ? JSON.parse(target.value) : null;
    this.selectedUser = user;
  }
}
