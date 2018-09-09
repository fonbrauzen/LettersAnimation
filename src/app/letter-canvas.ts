import { Letter } from './letter';

export class LetterCanvas extends Letter {
    moveDirectionRight = true;
    positionX: number;
    x = 5;
    y = 15;
    public draw(context: CanvasRenderingContext2D) {
        context.font = '400 14px Roboto,"Helvetica Neue",sans-serif';
        context.fillText(this.letter, this.x, this.y);
    }
}
