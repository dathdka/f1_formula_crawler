import { Model } from "objection";

export class cars extends Model {
    static get tableName () {
        return 'cars';
    }

    static get relationMappings () {
        return {
            season_driver: {
                relation: Model.HasManyRelation,
                modelClass : `${__dirname}/season_driver`,
                join: {
                    from : 'cars.id',
                    to : 'season_driver.car_id'
                }
            },
            season_team: {
                relation: Model.HasManyRelation,
                modelClass : `${__dirname}/season_team`,
                join: {
                    from : 'cars.id',
                    to : 'season_team.car_id'
                }
            }
        }
    }
}