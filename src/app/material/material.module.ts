import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const MaterialComponents=[
  MatSlideToggleModule,
  MatButtonModule,
  MatIconModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatButtonToggleModule
];

@NgModule({
  imports: [ MaterialComponents ],
  exports:[ MaterialComponents ]
})
export class MaterialModule { }
