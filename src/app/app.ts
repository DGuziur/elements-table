import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeriodicTable } from './features/elements/components/periodic-table/periodic-table';

@Component({
  selector: 'app-root',
  imports: [PeriodicTable],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected title = 'elements';
}
