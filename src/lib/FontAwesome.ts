import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleDown,
  faAngleUp,
  faMap,
  faMapLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

/**
 * For some reason these are the only ones that need to load here
 * maybe because all the other icons load much later with the
 * map.
 */
library.add(faAngleDown, faAngleUp, faMap, faUser, faMapLocationDot);
