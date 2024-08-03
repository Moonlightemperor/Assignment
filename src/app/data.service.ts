import { Injectable } from '@angular/core';
import { Workout, User } from './models/workout.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storageKey = 'users'; // Changed to 'users' to reflect the new structure
  workoutsChanged = new Subject<void>();

  // Fetch all users with their workouts
  getUsers(): User[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  // Save a workout for a specific user
  saveWorkout(userId: number, workout: Workout) {
    const users = this.getUsers();
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
      users[userIndex].workouts.push(workout);
    } else {
      const newUser: User = {
        id: userId,
        name: workout.name,
        workouts: [workout]
      };
      users.push(newUser);
    }

    localStorage.setItem(this.storageKey, JSON.stringify(users));
    this.workoutsChanged.next();
  }

  // Initial data setup
  initializeData() {
    const initialUsers: User[] = [
      {
        id: 1,
        name: 'John Doe',
        workouts: [
          {
            type: 'Running', minutes: 30,
            id: 0,
            name: ''
          },
          {
            type: 'Cycling', minutes: 45,
            id: 0,
            name: ''
          }
        ]
      },
      {
        id: 2,
        name: 'Jane Smith',
        workouts: [
          {
            type: 'Swimming', minutes: 60,
            id: 0,
            name: ''
          },
          {
            type: 'Running', minutes: 20,
            id: 0,
            name: ''
          }
        ]
      },
      {
        id: 3,
        name: 'Mike Johnson',
        workouts: [
          {
            type: 'Yoga', minutes: 50,
            id: 0,
            name: ''
          },
          {
            type: 'Cycling', minutes: 40,
            id: 0,
            name: ''
          }
        ]
      }
    ];

    if (this.getUsers().length === 0) {
      localStorage.setItem(this.storageKey, JSON.stringify(initialUsers));
    }
  }
}
