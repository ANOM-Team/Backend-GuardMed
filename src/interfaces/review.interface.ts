export interface ReviewInterface {
  id?: string;
  pharmacyId: string;
  userId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
  updatedAt?: Date;
}
