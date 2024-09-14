import { environment } from "../../../environments/environment.development";

export const getTaskUseCase = async (id: string) => {
  try {
    const resp = await fetch(`${environment.backEndApi}/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await resp.json(); // Asume que la respuesta es JSON
    return data; // Aquí deberías obtener el arreglo de objetos esperado
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return {id: 0, name: ''};
  }
}
