import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmation-dialog-t1',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './confirmation-dialog-t1.component.html',
  styleUrls: ['./confirmation-dialog-t1.component.scss']
})
export class ConfirmationDialogT1Component {

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogT1Component>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void { }

  closeDialog(result: string) {
    this.dialogRef.close(result);
  }
}