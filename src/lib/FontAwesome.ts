import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faMap,
  faMapLocationDot,
} from "@fortawesome/free-solid-svg-icons";

/**
 * For some reason these are the only ones that need to load here
 * maybe because all the other icons load much later with the
 * map.
 */
library.add(faCaretDown, faCaretUp, faMap, faMapLocationDot);
