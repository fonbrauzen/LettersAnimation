import { Component } from '@angular/core';
import { of } from 'rxjs';
import { distinct, findIndex } from 'rxjs/operators';

import { Letter } from './letter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Letters Animation';
  letters: Letter[];
  constructor() {
    this.letters = [];
  }

  onLetterAdd(event: Letter) {
    const letters = this.letters.slice();
      const newLetters: Letter[] = [];
      // console.log(event);
      letters.push(event);
      of<Letter>(...letters).pipe(distinct((m: Letter) => m.letter)).subscribe(r => {
        newLetters.push(r);
      }, e => console.error(e), () => {
        this.letters = newLetters;
        console.log('new letters');
        console.log(this.letters);
      });

  }
  onLetterRemove(event: Letter) {
    const letters = this.letters.slice();
    of<Letter>(...letters).pipe(findIndex((m: Letter) => m.letter === event.letter)).subscribe(r => {
      if (r > -1) {
        letters.splice(r, 1);
      }
    }, e => console.error(e), () => {
      this.letters = letters;
      console.log('spliced letters');
      console.log(this.letters);
    });
  }
}
