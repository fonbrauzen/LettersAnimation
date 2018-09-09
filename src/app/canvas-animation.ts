import { Letter } from './letter';
import { LetterCanvas } from './letter-canvas';


export class CanvasAnimation {

    private context: CanvasRenderingContext2D;
    private canvas: HTMLCanvasElement;
    constructor() {// public ngZone: NgZone) {
    }
    public DrawAnimation(canvasContainerId: string, letter: Letter): number {
        this.canvas = <HTMLCanvasElement>document.getElementById(canvasContainerId);
        this.context = this.canvas.getContext('2d');
        let animationId: number;
        const letterCanvas = new LetterCanvas(letter.letter, letter.speed);
        // this.ngZone.runOutsideAngular(() => {
            animationId = window.requestAnimationFrame(() => this.draw(letterCanvas));
            // });
        return animationId;
    }
    public CancelAnimation(animationId: number) {
        window.cancelAnimationFrame(animationId);
    }
    draw(letter: LetterCanvas) {
        const BB = this.canvas.getBoundingClientRect(),
              offsetX = BB.left,
              offsetY = BB.top,
              width = this.canvas.width - 5,
              height = this.canvas.height;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        letter.draw(this.context);
        letter.x += letter.speed;
        if (letter.x + letter.speed > width ||
            letter.x + letter.speed < 0) {
            letter.speed = -letter.speed;
        }
        // this.ngZone.runOutsideAngular(() => {
        window.requestAnimationFrame(() => this.draw(letter));
        // });
    }
}
