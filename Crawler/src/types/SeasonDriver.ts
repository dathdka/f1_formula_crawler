import { Season } from "./Season";
import { Driver } from "./Driver";
export interface SeasonDriver {
  id?: number;
  season_id?: number;
  driver_id?: number;
  car_id: number;
  number?: number;
  season?: Season;
  driver?: Driver;
}
