/* Defines the product entity */
export interface Activity {
  id: number;
  activityName: string;
  activityAge: string;
  tags?: string[];
  description: string;
  skillDevelopment: string;
  starRating: number;
  imageUrl: string;
}

