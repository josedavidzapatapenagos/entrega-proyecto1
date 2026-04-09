export type Cliente = {
  id: string;
  nombre: string;
  correo: string;
  dinero: number;
  historial: number[];
};

let clientes: Cliente[] = [];

export const getClientes = () => clientes;

export const addCliente = (c: Cliente) => clientes.push(c);

export const deleteCliente = (id: string) => {
  clientes = clientes.filter(c => c.id !== id);
};

export const updateCliente = (id: string, data: Partial<Cliente>) => {
  clientes = clientes.map(c =>
    c.id === id
      ? {
          ...c,
          ...data,
          historial: [
            ...c.historial,
            data.dinero ?? c.dinero // 🔥 historial dinámico
          ],
        }
      : c
  );
};