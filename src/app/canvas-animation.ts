import { Letter } from './letter';
import { LetterCanvas } from './letter-canvas';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgZone } from '@angular/core';


export class CanvasAnimation {
    trackLetters: LetterCanvas[];
    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    width: number;
    containerInitiated = false;

    constructor(public ngZone: NgZone) {
        this.trackLetters = [];
    }
    public DrawAnimation(canvasContainerId: string, letter: Letter): number {
        if (!this.containerInitiated) {
            this.canvas = <HTMLCanvasElement>document.getElementById(canvasContainerId);
            this.context = this.canvas.getContext('2d');
            this.width = this.canvas.width - 5;
            this.containerInitiated = true;
        }
        let animationId: number;
        const letterIndex = this.add2ArrayIfNeededAndGetIndex(letter);
        this.move2RightStoppedLetters(this.trackLetters[letterIndex]);
        animationId = window.requestAnimationFrame(() => this.draw(letterIndex));
        return animationId;
    }
    private add2ArrayIfNeededAndGetIndex(letter: Letter): number {
        let result: number;
        if (!this.trackLetters.some((item: LetterCanvas) => item.letter === letter.letter)) {
            const letterCanvas = new LetterCanvas(letter.letter, letter.speed);
            this.trackLetters.unshift(letterCanvas);
            result = this.getLetterIndex(letter);
        } else {
            result = this.getLetterIndex(letter);
        }
        return result;
    }
    private getLetterIndex(letter: Letter) {
        return this.trackLetters.findIndex((x) => x.letter === letter.letter);
    }
    public CancelAnimation(animationId: number) {
        window.cancelAnimationFrame(animationId);
    }
    private draw(letterIndex: number) {
        this.clearTrack();
        for (let i = 0; i < this.trackLetters.length; i++) {
            const letter = this.trackLetters[i];
            letter.draw(this.context);
            letter.x += letter.speed;
            // console.log(`letter ${letter.letter} speed ${letter.speed}`);
            if (letter.speed !== 0) {
                const isFirstLetter = i === 0 ? true : false;
                const isLastLetter = i === this.trackLetters.length - 1 ? true : false;
                this.speedSwitcher(letter, isFirstLetter, isLastLetter, i);
            }
        }
        this.ngZone.runOutsideAngular(() => {
        window.requestAnimationFrame(() => this.draw(letterIndex));
        });
    }
    private speedSwitcher(letter: LetterCanvas, isFirstLetter: boolean, isLastLetter: boolean, index: number) {
        let previousLetterX = 0;
        let nextLetterX = this.width;
        if (!isFirstLetter) {
            // console.log(letter.letter);
            // console.log(isFirstLetter);
            // console.log(this.trackLetters);
            // console.log(index);
            previousLetterX = this.trackLetters[index - 1].x + 10;
        }
        if (!isLastLetter) {
            // console.log(letter.letter);
            // console.log(isLastLetter);
            // console.log(this.trackLetters);
            // console.log(index);
            nextLetterX = this.trackLetters[index + 1].x - 10;
            // console.log(`letter ${letter.letter} is #${index}, previousLetterX: ${previousLetterX}, nextLetterX: ${nextLetterX}`);
        }
        if (
            letter.x + letter.speed > nextLetterX ||
            letter.x + letter.speed < previousLetterX) {
            letter.speed = -letter.speed;
        }
    }

    private move2RightStoppedLetters(letter: LetterCanvas) {
        if (letter.speed === 0 && this.trackLetters.length > 1) {
            of(...this.trackLetters).pipe(filter(x => x.speed === 0 && x.letter !== letter.letter)).subscribe(r => {
                r.draw(this.context);
                r.x += 10;
            });
        }
    }

    private clearTrack() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public RemoveLetter(letter: Letter) {
        const index = this.getLetterIndex(letter);
        if (index >= 0) {
            this.trackLetters.splice(index, 1);
        }
    }
    public ChangeSpeed(letter: Letter) {
        const index = this.getLetterIndex(letter);
        if (index >= 0) {
            this.trackLetters[index].speed = letter.speed;
        }
    }
}
