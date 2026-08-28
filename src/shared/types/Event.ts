export type Event = {
  id: string;
  name: string;
  description: string;
  category: "Koncert" | "Sport" | "Festival";
  date: string;
  time: string;
  price: number;
  image: string;
};
