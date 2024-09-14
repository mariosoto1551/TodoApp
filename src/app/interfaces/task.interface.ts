export interface Task{
  id?: string;
  name: string;
  description?: string;
  tags?: string[];
  urgency: string;
  date?: string;
}
export enum Urgency{
  Normal='normal', Urgent='urgent', VeryUrgent='very urgent'
}
