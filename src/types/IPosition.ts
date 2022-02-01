import { IUser } from "./IUser";

export interface IPosition {
  position: [number, number];
  map: string;
  time: number;
  name: string;
  role: string;
}

export function serializePosition(p: IPosition) {
  return `${p.map}|${p.time}|${p.position[0]}|${p.position[1]}`;
}

export function deserializePosition(p: string, user: IUser): IPosition {
  // Assumes the data is good, yikes
  const split = p.split("|");
  return {
    position: [Number(split[2]), Number(split[3])],
    map: split[0],
    time: Number(split[1]),
    name: user.name,
    role: user.role,
  };
}
