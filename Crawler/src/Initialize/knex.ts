import knex, {Knex} from "knex";
import { Model } from "objection";
import {config} from '../knexfile';
const { NODE_ENV } = require('../constants');

let knexConnection: Knex;

module.exports = () => {
  if (!knexConnection) {
    knexConnection = knex(config[NODE_ENV]);
    Model.knex(knexConnection);
  }
  return knexConnection;
};
