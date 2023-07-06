import { Race } from "./Race";
import { Season } from "./Season";
export interface SeasonRace {
    id?: number;
    season_id: number;
    race_id: number; 
    season? : Season;
    race?: Race;
}