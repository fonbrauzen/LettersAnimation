import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { distinct, findIndex } from 'rxjs/operators';

import { Letter } from '../letter';
import { LetterCanvas } from '../letter-canvas';
import { LettersEventsService } from '../letters-events.service';
import { CanvasAnimation } from '../canvas-animation';

@Component({
  selector: 'app-letters-track',
  templateUrl: './letters-track.component.html',
  styleUrls: ['./letters-track.component.css']
})
export class LettersTrackComponent implements OnInit {
  trackLetters: LetterCanvas[];
  letters: Letter[];
  trackId = 'letters-track-canvas';
  trackPadding = 5;
  // canvas parameters
  // canvas = <HTMLCanvasElement>document.getElementById(this.trackId);
  // ctx = this.canvas.getContext('2d');
  // BB = this.canvas.getBoundingClientRect();
  // offsetX = this.BB.left;
  // offsetY = this.BB.top;
  // width = this.canvas.width;
  // height = this.canvas.height;
  // font = '400 14px Roboto,"Helvetica Neue",sans-serif';
  // letterWIdth = 16;
  // letterHeight = 16;
  canvasAnimation: CanvasAnimation;
  constructor(
    private letterEvents: LettersEventsService
  ) {
    this.trackLetters = [];
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
    // this.AnimateLetters();
  }
  // AnimateLetters() {
  //   for (let index = 0; index < this.letters.length; index++) {
  //     const element = this.letters[index];
  //     this.Animation(element.speed, index, this.letters.length, element.letter);
  //   }
  //   console.log('animation call');
  // }
  // Animation(speed: number, lettersIndex: number, lettersLength: number, letter: string) {

  // }

  onLetterAdd(event: Letter) {
    const letters = this.letters.slice(),
      newLetters: Letter[] = [],
      lettersLength = letters.length;
    // console.log(event);
    letters.push(event);
    of<Letter>(...letters).pipe(distinct((m: Letter) => m.letter)).subscribe(r => {
      newLetters.push(r);
    }, e => console.error(e), () => {
      this.letters = newLetters;
      console.log('new letters');
      console.log(this.letters);
    });
    if (lettersLength === this.letters.length) {
      this.letterEvents.SpeedChanged.next(event);
    }
    this.canvasAnimation.DrawAnimation(this.trackId, this.letters[0]); // TODO rewrite this hardcode
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
  onSpeedChanged(letter: Letter) {
    // TODO handling
  }
}
