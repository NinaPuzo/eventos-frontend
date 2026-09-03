export type CreateEventRequest = {
  userId: string;
  categoryId: string;
  imagePath: string;
  eventName: string;
  description: string;
  locationName: string;
  capacity: number;
  ticketCost: number;
  isCanceled: boolean;
  startTime: string;
  endTime: string;
};
