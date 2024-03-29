import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faMap,
  faMapLocationDot,
  faUser,
  faSignOut,
  faSignIn,
  faMask,
  faUpDownLeftRight,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";

/**
 * For some reason these are the only ones that need to load here
 * maybe because all the other icons load much later with the
 * map.
 */
library.add(
  faAngleDown,
  faAngleUp,
  faMap,
  faUser,
  faSignOut,
  faSignIn,
  faMapLocationDot,
  faMask,
  faUpDownLeftRight,
  faPencil
);
