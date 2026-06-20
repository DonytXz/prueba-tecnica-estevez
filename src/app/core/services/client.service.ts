import { Injectable, signal } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private initialClients: Client[] = [
    { id: '1', name: 'Laura Martinez', email: 'laura@estevez.com.mx', country: 'MX', phone: '5512345678', company: 'Grupo Estevez' },
    { id: '2', name: 'Carlos Solano', email: 'carlos@techcorp.com', country: 'MX', phone: '5512345679', company: 'Tech Corp' }
  ];

  clients = signal<Client[]>(this.initialClients);

  constructor() {}

  addClient(clientData: Omit<Client, 'id'>): void {
    const newClient: Client = {
      ...clientData,
      id: crypto.randomUUID()
    };
    this.clients.update(currentClients => [...currentClients, newClient]);
  }

  updateClient(updatedClient: Client): void {
    this.clients.update(currentClients =>
      currentClients.map(client =>
        client.id === updatedClient.id ? updatedClient : client
      )
    );
  }

  deleteClient(id: string): void {
    this.clients.update(currentClients =>
      currentClients.filter(client => client.id !== id)
    );
  }

  // Restore a previously deleted client (preserves original id)
  restoreClient(client: Client): void {
    this.clients.update(currentClients => [...currentClients, client]);
  }
}
