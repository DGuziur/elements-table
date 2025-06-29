import { Injectable } from '@angular/core';
import { PeriodicElement } from '../types/periodic-element.type';
import { delay, Observable, of } from 'rxjs';
import { ELEMENT_DATA } from '../config/element-data.config';

@Injectable({
  providedIn: 'root',
})
export class ElementsService {
  getElementsList(): Observable<PeriodicElement[]> {
    return of(ELEMENT_DATA).pipe(delay(1000));
  }
}
