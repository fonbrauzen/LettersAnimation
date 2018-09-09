import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Letter } from '../letter';
import { LetterValidatorDirective } from '../letter-validator.directive';
import { LettersEventsService } from '../letters-events.service';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {
  letterForm: FormGroup;
  letter: Letter;

  constructor(
    private letterEvents: LettersEventsService
  ) {
    this.letter = new Letter('', 0);
  }

  ngOnInit() {
    this.letterForm = new FormGroup({
      letter: new FormControl(this.letter.letter,
        [Validators.maxLength(1), Validators.required, LetterValidatorDirective.validate]),
      speed: new FormControl(this.letter.speed),
    });
  }
  onSubmit() {
    this.letterEvents.LetterAdded.next(this.letterForm.value);
  }
  onReduce() {
    this.letterEvents.LetterRemoved.next(this.letterForm.value);
  }
}
