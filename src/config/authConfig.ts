import { FirebaseOptions } from "@firebase/app";

// These files are not checked in and need to be created for local dev and deployment
import configJson from "./auth.config.json";
import configJsonDev from "./auth.config.dev.json";

export const authConfig: FirebaseOptions =
  process.env.NODE_ENV === "production" ? configJson : configJsonDev;
