export interface DriverRank {
    id? : number;
    driver_id? :number;
    race_id? :number;
    position : number;
    points: number;
    completed_laps: number;
    finish_time: string;
    start_position?: number;
    fastest_lap_id?: number;
    pit_stop_id?: number;
    qualifying_id?: number;
}