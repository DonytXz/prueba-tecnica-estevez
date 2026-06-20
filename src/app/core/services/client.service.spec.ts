import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ClientService } from './client.service';

describe('ClientService', () => {
  let service: ClientService;

  beforeEach(() => {
    service = new ClientService();
  });

  it('should have initial clients', () => {
    const list = service.clients();
    expect(list.length).toBeGreaterThan(0);
  });

  it('should add a client', () => {
    const spy = vi.spyOn(globalThis.crypto, 'randomUUID').mockReturnValue('test-uuid');

    service.addClient({ name: 'Test', email: 't@t.com', phone: '123', company: 'TCo' });
    const list = service.clients();
    const found = list.find(c => c.id === 'test-uuid');
    expect(found).toBeTruthy();

    spy.mockRestore();
  });

  it('should update a client', () => {
    const first = service.clients()[0];
    service.updateClient({ ...first, name: 'Updated' });
    expect(service.clients().find(c => c.id === first.id)?.name).toBe('Updated');
  });

  it('should delete a client', () => {
    const id = service.clients()[0].id;
    service.deleteClient(id);
    expect(service.clients().find(c => c.id === id)).toBeUndefined();
  });
});
