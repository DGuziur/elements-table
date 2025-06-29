import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { ElementsService } from '../services/emements.service';
import { PeriodicElement } from '../types/periodic-element.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';
import { ElementsState } from '../types/elements-state.type';

const ElementsStore = signalStore(
  withState<ElementsState>({
    elements: [],
    error: null,
    isLoading: false,
  }),
  withMethods((store, elementsService = inject(ElementsService)) => ({
    loadElements: rxMethod<PeriodicElement[]>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() => {
          return elementsService.getElementsList().pipe(
            tap({
              next: (elements) =>
                patchState(store, {
                  elements: elements,
                  isLoading: false,
                }),
              error: (error) =>
                patchState(store, {
                  error: error.message || 'Failed to load elements',
                  isLoading: false,
                }),
            })
          );
        })
      )
    ),
    addElement: (element: PeriodicElement) => {
      patchState(store, {
        elements: [...store.elements(), element],
      });
    },
    removeElement: (position: number) => {
      patchState(store, {
        elements: store.elements().filter((el) => el.position !== position),
      });
    },
    updateElement: (updatedElement: PeriodicElement) => {
      patchState(store, {
        elements: store
          .elements()
          .map((el) =>
            el.position === updatedElement.position ? updatedElement : el
          ),
      });
    },
    clearElements: () => {
      patchState(store, { elements: [], error: null });
    },
  }))
);
