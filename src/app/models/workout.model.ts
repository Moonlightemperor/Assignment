
export interface Workout {
  id: number;
  name: string;
  type: string;
  minutes: number;
}

export interface User {
  id: number;
  name: string;
  workouts: Workout[];
}