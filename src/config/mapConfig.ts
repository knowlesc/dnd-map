// These files are not checked in and need to be created for local dev and deployment
import configJson from "./map.config.json";
import configJsonDev from "./map.config.dev.json";

export type MapConfig = {
  mapName: string;
  displayName: string;
  imageUrl: string;
  sizeX: number;
  sizeY: number;
  path: string;
};

export const mapConfig: MapConfig[] =
  process.env.NODE_ENV === "production" ? configJson : configJsonDev;
