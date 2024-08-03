import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Workout, User } from '../models/workout.model';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-workout-list',
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.css']
})
export class WorkoutListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'type','totalWorkouts' ,'minutes'];
  // displayedColumns: string[] = ['name', 'workouts'];

  dataSource = new MatTableDataSource<User>();
  searchName = '';
  filterType = '';
  workoutTypes: string[] = ['Cardio', 'Strength', 'Flexibility'];
  selectedUser: User | null = null; 
  private workoutSubscription!: Subscription;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.initializeData(); 
    this.loadWorkouts();

    // Subscribe to changes in the workout list
    this.workoutSubscription = this.dataService.workoutsChanged.subscribe(() => {
      this.loadWorkouts();
      this.updateWorkoutTypes();
    });
  }
  ngOnDestroy() {
    // Clean up subscription when the component is destroyed
    this.workoutSubscription.unsubscribe();
  }

  loadWorkouts() {
    this.dataSource.data = this.dataService.getUsers();
    setTimeout(() => {
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
        console.log('Paginator assigned:', this.paginator); // Debugging line
      }
    }, 0);
  }

  onSelectUser(user: User) {
    console.log('User selected:', user); // Debugging line
    this.selectedUser = user;
  }
  
  applyFilter() {
    this.dataSource.filter = this.searchName.trim().toLowerCase();

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.name.toLowerCase().includes(filter);
    };
  }

  applyTypeFilter(event: MatSelectChange) {
    const filterValue = event.value ? event.value.trim().toLowerCase() : '';

    this.dataSource.filterPredicate = (data: User, filter: string) => {
      return data.workouts.some(workout =>
        workout.type.toLowerCase().includes(filter)
      );
    };

    this.dataSource.filter = filterValue;
  }

  updateWorkoutTypes() {
    const allWorkouts = this.dataSource.data.flatMap(user => user.workouts);
    const types = allWorkouts.map(workout => workout.type);
    this.workoutTypes = Array.from(new Set(types));
  }

  getTotalMinutes(workouts: Workout[]): number {
    return workouts.reduce((total, workout) => total + workout.minutes, 0);
  }

  getWorkoutTypes(workouts: Workout[]): string {
    const uniqueTypes = new Set(workouts.map(workout => workout.type));
    return Array.from(uniqueTypes).join(', ');
  }
 
}