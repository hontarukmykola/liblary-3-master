export interface HotelModel {
  id: number;
  number: number;
  rating: number;
  price: number;
  discount?: number;
  flour: number;
  amoundOfPeople: number;
  amoundOfBed: number;
}

export type HotelFormField = {
  id: number;
  number: number;
  rating: number;
  price: number;
  discount?: number;
  flour: number;
  amoundOfPeople: number;
  amoundOfBed: number;
};
