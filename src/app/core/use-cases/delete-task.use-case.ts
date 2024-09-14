import { environment } from "../../../environments/environment.development";

export const deleteTaskUseCase = async (id: string) => {
  try {
    console.log(id);
    const resp = await fetch(`${environment.backEndApi}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!resp.ok) {
      throw new Error('Network response was not ok');
    }
 // Asume que la respuesta es JSON // Aquí deberías obtener el arreglo de objetos esperado
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}
