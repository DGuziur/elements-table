import { PeriodicElement } from './periodic-element.type';

export type ElementsState = {
  elements: PeriodicElement[];
  error: string | null;
  isLoading: boolean;
};
