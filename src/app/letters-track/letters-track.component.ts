import { Component, OnInit, Input } from '@angular/core';
import { Letter } from '../letter';

@Component({
  selector: 'app-letters-track',
  templateUrl: './letters-track.component.html',
  styleUrls: ['./letters-track.component.css']
})
export class LettersTrackComponent implements OnInit {

  @Input('letters') letters: Letter[];

  constructor() { }

  ngOnInit() {
    this.AnimateLetters();
  }
  AnimateLetters() {
    for (let index = 0; index < this.letters.length; index++) {
      const element = this.letters[index];
      this.Animation(element.speed, index, this.letters.length, element.letter);
    }
  }
  Animation(speed: number, lettersIndex: number, lettersLength: number, letter: string) {
    // document.getElementById(letter).animate([
    //   // keyframes
    //   { transform: 'translateX(0px)' }, 
    //   { transform: 'translateX(+343px)' }
    // ], {
    //   // timing options
    //   duration: 1000,
    //   iterations: Infinity
    // });
    // this.Animate({
    //   duration: 1000,
    //   timing(timeFraction) {
    //     return timeFraction;
    //   },
    //   draw(progress) {
    //     document.getElementById(letter).animate = progress * 100 + '%';
    //   }
    // });
  }
  Animate({ timing, draw, duration }) {

    const start = performance.now();

    requestAnimationFrame(function animate(time) {
      // timeFraction goes from 0 to 1
      let timeFraction = (time - start) / duration;
      if (timeFraction > 1) {
        timeFraction = 1;
      }

      // calculate the current animation state
      const progress = timing(timeFraction);
      draw(progress); // draw it
      if (timeFraction < 1) {
        requestAnimationFrame(animate);
      }
    });
  }

}
