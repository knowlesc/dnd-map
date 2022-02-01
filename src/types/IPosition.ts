// TODO: this is sent via ws, and should be trimmed to as little data as possible
export interface IPosition {
  position: [number, number];
  map: string;
  time: number;
  name: string;
  role: string;
}
