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

@Component({
  selector: 'app-periodic-table',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './periodic-table.html',
  styleUrl: './periodic-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeriodicTable implements OnInit {
  private readonly elementsStore = inject(ElementsStore);
  private filterInput =
    viewChild.required<ElementRef<HTMLInputElement>>('filterInput');
  displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'symbol',
    'actions',
  ];

  protected readonly elements = this.elementsStore.elements;
  protected readonly isLoading = this.elementsStore.isLoading;
  protected readonly error = this.elementsStore.error;

  protected dataSource = computed(
    () => new MatTableDataSource(this.elements())
  );

  ngOnInit(): void {
    this.elementsStore.loadElements();
  }

  loadElements(): void {
    this.elementsStore.loadElements();
  }

  applyFilter(): void {
    const filterValue = this.filterInput().nativeElement.value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }

  clearFilter(): void {
    this.filterInput().nativeElement.value = '';
    this.dataSource().filter = '';
  }
}
