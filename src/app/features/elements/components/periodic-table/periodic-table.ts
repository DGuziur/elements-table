import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
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
import { MatDialog } from '@angular/material/dialog';
import { ElementForm } from '../element-form/element-form';
import { DEFAULT_COLUMNS } from '../../config/displayed-columns.config';

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
  private dialog = inject(MatDialog);
  protected filterForm = new FormControl<string>('');
  protected displayedColumns: string[] = DEFAULT_COLUMNS;

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

  addElement(): void {
    const dialogRef = this.dialog.open(ElementForm, {
      data: {
        title: 'Add new element',
      },
    });

    dialogRef.afterClosed().subscribe((element: PeriodicElement | null) => {
      if (element) {
        this.elementsStore.addElement(element);
      }
    });
  }

  editElement(element: PeriodicElement): void {
    const dialogRef = this.dialog.open(ElementForm, {
      data: {
        title: 'Edit element',
        element: element,
      },
    });

    dialogRef
      .afterClosed()
      .subscribe((updatedElement: PeriodicElement | null) => {
        if (updatedElement) {
          this.elementsStore.updateElement(updatedElement);
        }
      });
  }
}
