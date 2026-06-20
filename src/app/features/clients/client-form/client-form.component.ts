import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatSelectModule],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.css'
})
export class ClientFormComponent {
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ClientFormComponent>);
  data = inject<Client>(MAT_DIALOG_DATA);

  clientForm = this.fb.group({
    name: [this.data?.name || '', Validators.required],
    email: [this.data?.email || '', [Validators.required, Validators.email]],
    country: [(this.data as any)?.country || 'MX', Validators.required],
    phone: [this.data?.phone || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    company: [this.data?.company || '', Validators.required]
  });

  onSave() { if (this.clientForm.valid) this.dialogRef.close(this.clientForm.value); }
  onCancel() { this.dialogRef.close(); }
}
