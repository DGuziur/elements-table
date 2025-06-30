import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { ElementsStore } from '../../store/elements.store';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { PeriodicElement } from '../../types/periodic-element.type';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { debounceTime, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-periodic-table',
  imports: [
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
  ],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTable implements OnInit {
  private readonly elementsStore = inject(ElementsStore);
  protected filterForm = new FormControl<string>('');
  protected displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];

  protected readonly elements = this.elementsStore.elements;
  protected readonly isLoading = this.elementsStore.isLoading;
  protected readonly error = this.elementsStore.error;

  protected $formSubscribe = this.filterForm.valueChanges.pipe(
    debounceTime(2000),
    tap((val: string | null) => {
      this.dataSource().filter = val?.trim().toLowerCase() ?? '';
    })
  );

  protected dataSource = computed(
    () => new MatTableDataSource(this.elements())
  );

  ngOnInit(): void {
    this.elementsStore.loadElements();
  }

  loadElements(): void {
    this.elementsStore.loadElements();
  }

  deleteElement(element: PeriodicElement): void {
    this.elementsStore.removeElement(element.position);
  }

  clearFilter(): void {
    this.filterForm.reset();
  }
}
