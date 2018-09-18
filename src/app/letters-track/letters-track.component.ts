import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { distinct } from 'rxjs/operators';

import { Letter } from '../letter';
import { LettersEventsService } from '../letters-events.service';
import { CanvasAnimation } from '../canvas-animation';

@Component({
  selector: 'app-letters-track',
  templateUrl: './letters-track.component.html',
  styleUrls: ['./letters-track.component.css']
})
export class LettersTrackComponent implements OnInit {
  letters: Letter[];
  trackId = 'letters-track-canvas';
  canvasAnimation: CanvasAnimation;
  constructor(
    private letterEvents: LettersEventsService
  ) {
    this.letters = [];
    this.canvasAnimation = new CanvasAnimation();
  }

  ngOnInit() {
    this.letterEvents.LetterAdded.subscribe(letter => {
      this.onLetterAdd(letter);
    });
    this.letterEvents.LetterRemoved.subscribe(letter => {
      this.onLetterRemove(letter);
    });
    this.letterEvents.SpeedChanged.subscribe(letter => {
      this.onSpeedChanged(letter);
    });
  }

  onLetterAdd(eventLetter: Letter) {
    const letters = this.letters.slice(),
      newLetters: Letter[] = [],
      lettersLength = letters.length;
    letters.push(eventLetter);
    of<Letter>(...letters).pipe(distinct((m: Letter) => m.letter)).subscribe(r => {
      newLetters.push(r);
    }, e => console.error(e), () => {
      this.letters = newLetters;
      // console.log('new letters');
      // console.log(this.letters);
      if (lettersLength === this.letters.length) {
        this.letterEvents.SpeedChanged.next(eventLetter);
      } else {
        this.canvasAnimation.DrawAnimation(this.trackId, eventLetter);
      }
    });
  }
  onLetterRemove(event: Letter) {
    const letters = this.letters.slice();
    const r = letters.findIndex((m: Letter) => m.letter === event.letter);
      if (r > -1) {
        letters.splice(r, 1);
        this.letters = letters;
      // console.log('spliced letters');
      // console.log(this.letters);
      this.canvasAnimation.RemoveLetter(event);
      }
  }
  onSpeedChanged(letter: Letter) {
    this.canvasAnimation.ChangeSpeed(letter);
  }
}
