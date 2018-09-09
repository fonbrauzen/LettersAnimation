import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Letter } from './letter';

@Injectable({
  providedIn: 'root'
})
export class LettersEventsService {

  constructor() { }
public LetterAdded = new Subject<Letter>();
public LetterRemoved = new Subject<Letter>();
public SpeedChanged = new Subject<Letter>();
}
