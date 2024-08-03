import { Component, Input, OnChanges, SimpleChanges, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { User } from '../models/workout.model';

@Component({
  selector: 'app-workout-charts',
  templateUrl: './workout-charts.component.html',
  styleUrls: ['./workout-charts.component.css']
})
export class WorkoutChartsComponent implements OnChanges, AfterViewInit {
  @Input() user: User | null = null;
  @Input() users: User[] = [];
  @ViewChild('workoutChart', { static: false }) workoutChart!: ElementRef<HTMLCanvasElement>;
  chart: any;
  selectedUser: User | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && !changes['user'].firstChange) {
      console.log('User input changed:', this.user);
      this.updateChartForUser();
    }

    if (changes['users'] && !changes['users'].firstChange) {
      console.log('Users data changed:', this.users);
      this.updateChartForAllUsers();
    }
  }

  ngAfterViewInit() {
    // Ensure the chart is initialized only after the view is fully initialized
    // setTimeout(() => {
    //   console.log('Attempting to initialize chart...'); 
    //   this.initChartForAllUsers(); 
    // }, 0);
    this.initChartForAllUsers(); 
  }
  selectUser(user: User) {
    this.selectedUser = user;
    this.user = user;
    this.updateChartForUser();
  }


  initChartForAllUsers() {
    console.log('initChartForAllUsers - Trying to initialize chart');
    if (!this.workoutChart) {
      console.error('Canvas element not found');
      return;
    }

    const canvas = this.workoutChart.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Failed to get canvas context');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: this.getAggregatedData(),
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    console.log('Chart initialized for all users:', this.chart);
  }

  updateChartForAllUsers() {
    if (this.chart) {
      console.log('Updating chart with aggregated data for all users:', this.users);
      this.chart.data = this.getAggregatedData();
      this.chart.update();
      console.log('Chart updated for all users:', this.chart);
    } else {
      console.error('Chart is not initialized');
    }
  }

  updateChartForUser() {
    if (this.chart) {
      console.log('Updating chart with user data:', this.user);
      this.chart.data = this.getUserData();
      this.chart.update();
      console.log('Chart updated for user:', this.chart);
    } else {
      console.error('Chart is not initialized');
    }
  }

  getAggregatedData() {
    const aggregatedData: { [key: string]: number } = {};

    this.users.forEach(user => {
      user.workouts.forEach(workout => {
        if (aggregatedData[workout.type]) {
          aggregatedData[workout.type] += workout.minutes;
        } else {
          aggregatedData[workout.type] = workout.minutes;
        }
      });
    });

    return {
      labels: Object.keys(aggregatedData),
      datasets: [{
        label: 'Minutes',
        data: Object.values(aggregatedData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }

  getUserData() {
    if (!this.user) return { labels: [], datasets: [] };

    const userData: { [key: string]: number } = {};

    this.user.workouts.forEach(workout => {
      if (userData[workout.type]) {
        userData[workout.type] += workout.minutes;
      } else {
        userData[workout.type] = workout.minutes;
      }
    });

    return {
      labels: Object.keys(userData),
      datasets: [{
        label: 'Minutes',
        data: Object.values(userData),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }
}
