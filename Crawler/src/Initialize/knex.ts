import knex, {Knex} from "knex";
import { Model } from "objection";
const config = require('../knexfile');
const { NODE_ENV } = require('../constants');

let knexConnection: Knex;

module.exports = () => {
  if (!knexConnection) {
    knexConnection = knex(config[NODE_ENV || 'development']);
    Model.knex(knexConnection);
  }
  
  return knexConnection;
};
