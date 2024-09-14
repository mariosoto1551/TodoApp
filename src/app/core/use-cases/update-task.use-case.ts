import { environment } from "../../../environments/environment.development";
import { Task } from "../../interfaces/task.interface";

export const updateTaskUseCase = async ({name, description, urgency, date, tags}: Task, id: string) => {
  try {
    console.log(`${environment.backEndApi}/${id}`);
    const resp = await fetch(`${environment.backEndApi}/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, date, urgency, tags }), // Enviamos 'task' en lugar de 'product'
    });

    if (!resp.ok) {
      throw new Error('Failed to update task');
    }

    return await resp.json(); // Si la API responde con algún dato
  } catch (error) {

  }
}
