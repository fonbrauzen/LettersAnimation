import { Directive } from '@angular/core';
import { FormControl } from '@angular/forms';

const urlRegexp = new RegExp('[a-zA-Z]+');

@Directive({
  selector: '[appLetterValidator]'
})
export class LetterValidatorDirective {

  constructor() {
  }
  static validate(control: FormControl) {

    // first check if the control has a value
    if (control.value && control.value.length > 0) {

      // match the control value against the regular expression
      const matches = control.value.match(urlRegexp);
      // console.log(matches);
      // if there are matches return an object, else return null.
      return matches && matches.length ? null : { invalid_characters: matches };
    } else {
      return null;
    }
  }

}
