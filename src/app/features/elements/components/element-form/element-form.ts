import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PeriodicElement } from '../../types/periodic-element.type';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogData } from '../../types/element-dialog-data.type';

type PeriodicElementForm = {
  [K in keyof PeriodicElement]: FormControl<PeriodicElement[K] | null>;
};

@Component({
  selector: 'app-element-form',
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './element-form.html',
  styleUrl: './element-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ElementForm implements OnInit {
  private readonly dialogRef = inject(MatDialogRef);
  protected readonly data = inject<DialogData>(MAT_DIALOG_DATA);

  protected elementForm = new FormGroup<PeriodicElementForm>({
    position: new FormControl<number | null>(null, Validators.required),
    name: new FormControl<string | null>(null, Validators.required),
    weight: new FormControl<number | null>(null, Validators.required),
    symbol: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    if (this.data.element) {
      this.elementForm.patchValue(this.data.element);
    }
  }

  exitDialog(): void {
    this.dialogRef.close();
  }
}
