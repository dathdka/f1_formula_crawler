export interface DriverRank {
    driver_id? :number;
    race_id? :number;
    position : number;
    points: number;
    completed_laps: number;
    finish_time: string;
    start_position?: number;
}