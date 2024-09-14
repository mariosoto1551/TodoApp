import { environment } from "../../../environments/environment.development";
import { Task } from "../../interfaces/task.interface";

export const addTaskUseCase = async ({name, description, urgency, date, tags}: Task) => {
  try {
    const resp = await fetch(`${environment.backEndApi}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, description, date, urgency, tags }), // Enviamos 'task' en lugar de 'product'
    });

    if (!resp.ok) {
      throw new Error('Failed to add task');
    }

    return await resp.json(); // Si la API responde con algún dato
  } catch (error) {

  }
}
