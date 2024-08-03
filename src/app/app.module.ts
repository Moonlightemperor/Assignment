import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgChartsModule } from 'ng2-charts';
import { MatSelectModule } from '@angular/material/select';
import { AppComponent } from './app.component';
import { UserInputComponent } from './user-input/user-input.component';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutChartsComponent } from './workout-charts/workout-charts.component';
import { DataService } from './data.service';
import { AutoCompleteModule } from 'primeng/autocomplete';


@NgModule({
  declarations: [
    AppComponent,
    UserInputComponent,
    WorkoutListComponent,
    WorkoutChartsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    NgChartsModule,
    AutoCompleteModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
