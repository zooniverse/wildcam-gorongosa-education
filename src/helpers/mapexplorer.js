const mapconfig = require('../constants/mapExplorer.config.json');
import { initialState } from '../reducers/mapexplorer';

export const MapHelper = {
  calculateSql: (data = initialState, sqlQueryTemplate = mapconfig.cartodb.sqlQueryCountItems, specificCamera = '') => {
    return sqlQueryTemplate
      .replace(/{CAMERAS}/ig, mapconfig.cartodb.sqlTableCameras)
      .replace(/{SUBJECTS}/ig, mapconfig.cartodb.sqlTableSubjects)
      .replace(/{CLASSIFICATIONS}/ig, mapconfig.cartodb.sqlTableClassifications)
      .replace(/{AGGREGATIONS}/ig, mapconfig.cartodb.sqlTableAggregations)
      .replace(/{WHERE}/ig, MapHelper.calculateSqlWhereClause(data, specificCamera));
  },
  
  calculateSqlWhereClause: (data = initialState, specificCamera = '') => {
    //The biggest variable in the SQL query is the 'WHERE' clause.

    //Where constructor: species
    let sqlWhere_species = [];
    mapconfig.species.map((item) => {
      if (data.species.indexOf(item.id) >= 0) {
        sqlWhere_species.push(`species ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_species = (sqlWhere_species.length === 0)
      ? '' : `( ${sqlWhere_species.join(' OR ')} )`;

    //Where constructor: habitats
    let sqlWhere_habitats = [];
    mapconfig.habitats.map((item) => {
      if (data.habitats.indexOf(item.id) >= 0) {
        sqlWhere_habitats.push(`veg_type ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_habitats = (sqlWhere_habitats.length === 0)
      ? '' : `(${sqlWhere_habitats.join(' OR ')})`;

    //Where constructor: seasons
    let sqlWhere_seasons = [];
    mapconfig.seasons.map((item) => {
      if (data.seasons.indexOf(item.id) >= 0) {
        sqlWhere_seasons.push(`season ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_seasons = (sqlWhere_seasons.length === 0)
      ? '' : `(${sqlWhere_seasons.join(' OR ')})`;

    //Where constructor: date range
    let sqlWhere_dates = '';
    const validDate = /^\s*\d\d\d\d[\-\/\.]?\d?\d[\-\/\.]?\d?\d\s*$/g;
    if (data.dateStart.match(validDate) && data.dateEnd.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') BETWEEN \''+data.dateStart.trim()+'\' AND \''+data.dateEnd.trim()+'\')';
    } else if (data.dateStart.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') >= \''+data.dateStart.trim()+'\')';
    } else if (data.dateEnd.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') <= \''+data.dateEnd.trim()+'\')';
    }
    
    //Where constructor: time(s) of day
    let sqlWhere_timesOfDay = [];
    mapconfig.timesOfDay.map((item) => {
      if (data.timesOfDay.indexOf(item.id) >= 0) {
        sqlWhere_timesOfDay.push(`time_period ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_timesOfDay = (sqlWhere_timesOfDay.length === 0)
      ? '' : `(${sqlWhere_timesOfDay.join(' OR ')})`;
    
    //Where constructor: distance to humans
    let sqlWhere_distanceToHumans = '';
    const validDistance = /^\d+\.?\d*$/g;
    if (data.distanceToHumansMin.match(validDistance) && data.distanceToHumansMax.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m BETWEEN \''+data.distanceToHumansMin.trim()+'\' AND \''+data.distanceToHumansMax.trim()+'\')';
    } else if (data.distanceToHumansMin.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m >= \''+data.distanceToHumansMin.trim()+'\')';
    } else if (data.distanceToHumansMax.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m <= \''+data.distanceToHumansMax.trim()+'\')';
    }
    
    //Where constructor: distance to water
    let sqlWhere_distanceToWater = '';
    if (data.distanceToWaterMin.match(validDistance) && data.distanceToWaterMax.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m BETWEEN \''+data.distanceToWaterMin.trim()+'\' AND \''+data.distanceToWaterMax.trim()+'\')';
    } else if (data.distanceToWaterMin.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m >= \''+data.distanceToWaterMin.trim()+'\')';
    } else if (data.distanceToWaterMax.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m <= \''+data.distanceToWaterMax.trim()+'\')';
    }
    
    //Where constructor: user/groups/etc
    let sqlWhere_user = (data.user.trim() === '')
      ? '': '(user_hash ILIKE \''+data.user.replace(/'/, '\'\'').trim()+'\')';
      //WARNING: Either use =, LIKE or ILIKE (case-insensitive Like) depending on what the Panoptes API demands.

    //Where constructor: specific camera
    let sqlWhere_camera = (specificCamera.trim() !== '')
      ? '(camera ILIKE \''+specificCamera.replace(/'/, '\'\'').trim()+'\')'
      : '';

    //Join the Where constructor
    let sqlWhere = '';
    [sqlWhere_species, sqlWhere_habitats, sqlWhere_seasons, sqlWhere_dates, sqlWhere_timesOfDay, sqlWhere_distanceToHumans, sqlWhere_distanceToWater, sqlWhere_user, sqlWhere_camera].map((wherePart) => {
      if (wherePart !== '') {
        sqlWhere += (sqlWhere !== '') ? ' AND ' : '';
        sqlWhere += wherePart;
      }
    });
    if (sqlWhere !== '') {
      sqlWhere = ` WHERE ${sqlWhere}`;
    }

    return sqlWhere;
  }
};