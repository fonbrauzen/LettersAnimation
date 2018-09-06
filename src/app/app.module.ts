import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatFormFieldModule, MatSliderModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { InputsComponent } from './inputs/inputs.component';
import { LettersTrackComponent } from './letters-track/letters-track.component';
import { LetterValidatorDirective } from './letter-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputsComponent,
    LettersTrackComponent,
    LetterValidatorDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
