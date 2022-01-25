import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCaretDown,
  faCaretUp,
  faMap,
} from "@fortawesome/free-solid-svg-icons";

/**
 * For some reason this is the only one that needs to load here
 * maybe because all the other icons load much later with the
 * map.
 */
library.add(faCaretDown, faCaretUp, faMap);
