import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Letter } from '../letter';
import { LetterValidatorDirective } from '../letter-validator.directive';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  letterForm: FormGroup;
  letter: Letter;
  @Output() added: EventEmitter<Letter> = new EventEmitter();
  @Output() removed: EventEmitter<Letter> = new EventEmitter();

  constructor() {
    this.letter = new Letter();
  }

  ngOnInit() {
    this.letterForm = new FormGroup({
      letter: new FormControl(this.letter.letter,
        [Validators.maxLength(1), Validators.required, LetterValidatorDirective.validate]),
      speed: new FormControl(this.letter.speed),
    });
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    this.added.emit(this.letterForm.value);
  }
onReduce() {
  this.removed.emit(this.letterForm.value);
}
  // GenInputsArray(charA, charZ) {
  //   const a = [],
  //     j = charZ.charCodeAt(0);
  //   for (let i = charA.charCodeAt(0); i <= j; ++i) {
  //     a.push(String.fromCharCode(i));
  //     a.push(String.fromCharCode(i).toUpperCase());
  //   }
  //   return a;
  // }
}
