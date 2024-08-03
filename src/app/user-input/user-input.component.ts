import { Component } from '@angular/core';
import { DataService } from '../data.service';
import { Workout } from '../models/workout.model';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrls: ['./user-input.component.css']
})
export class UserInputComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes :number | null = null;;

  constructor(private dataService: DataService) {}

  addWorkout(): void{
    if (this.userName && this.workoutType && this.workoutMinutes !== null) {
      const workout : Workout = {
        id:0,
        name: this.userName,
        type: this.workoutType,
        minutes: this.workoutMinutes
      };
      const users = this.dataService.getUsers();
      const user = users.find(u => u.name.toLowerCase() === this.userName.toLowerCase());

      if (user) {
        // If user exists, add the workout to the existing user
        this.dataService.saveWorkout(user.id, workout);
      } else {
        // If user doesn't exist, create a new user with this workout
        const newUserId = users.length + 1; // Generate a new user ID
        this.dataService.saveWorkout(newUserId, workout);
      }
      this.userName = '';
      this.workoutType = '';
      this.workoutMinutes = null;
    }
  }
}
