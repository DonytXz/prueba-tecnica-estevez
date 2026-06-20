import { Component, inject, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ClientService } from '../../../core/services/client.service';
import { ClientFormComponent } from '../client-form/client-form.component';
import { Client } from '../../../core/models/client.model';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css'
})
export class ClientListComponent implements OnInit {
  clientService = inject(ClientService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);
  displayedColumns: string[] = ['name', 'email', 'phone', 'company', 'actions'];

  private countryDialCodes: Record<string, string> = {
    MX: '+52',
    US: '+1',
    ES: '+34'
  };

  formatPhone(client: Client): string {
    const dial = this.countryDialCodes[client.country ?? 'MX'] || '';
    return `${dial} ${client.phone}`;
  }

  ngOnInit(): void {
    const clients = this.clientService.clients();
    if (!clients || clients.length === 0) {
      this.snack.open('No hay clientes. Agrega uno nuevo.', 'Cerrar', { duration: 4000 });
    }
  }

  openForm(client?: Client) {
    const dialogRef = this.dialog.open(ClientFormComponent, { data: client, width: '400px' });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (client) {
          this.clientService.updateClient({ ...client, ...result });
          this.snack.open('Cliente actualizado', 'Cerrar', { duration: 3000 });
        } else {
          this.clientService.addClient(result);
          this.snack.open('Cliente agregado', 'Cerrar', { duration: 3000 });
        }
      }
    });
  }

  delete(id: string) { 
    const client = this.clientService.clients().find(c => c.id === id);
    if (!client) return;

    const confirmRef = this.snack.open(`¿Eliminar ${client.name}?`, 'Eliminar', { duration: 5000 });
    confirmRef.onAction().subscribe(() => {
      // perform deletion
      this.clientService.deleteClient(id);

      // show deleted with undo
      const deletedRef = this.snack.open('Cliente eliminado', 'Deshacer', { duration: 5000 });
      deletedRef.onAction().subscribe(() => {
        this.clientService.restoreClient(client);
        this.snack.open('Acción revertida', 'Cerrar', { duration: 2000 });
      });
    });
  }
}
