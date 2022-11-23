import { MapBody } from "../Map/MapBody/MapBody";
import { MapMenu } from "../MapMenu/MapMenu";

export function AppBody() {
  return (
    <main className="app-body">
      <MapBody />
      <MapMenu />
    </main>
  );
}
