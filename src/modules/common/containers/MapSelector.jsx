const config = require('../../../constants/mapExplorer.config.json');

class MapSelector {
  constructor() {
    this.id = //Random ID.
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)] +
      '0123456789abcdef'[Math.floor(Math.random() * 16)];
    this.mode = MapSelector.GUIDED_MODE;

    //Default filter selectors
    this.species = [];  //For a pre-set selection, use ['baboon', 'lion'] or etc.
    this.habitats = [];  //For a pre-set selection, use ['limestone', 'miombo'] or etc.
    this.seasons = [];  //For a pre-set selection, use ['janmar', 'aprjun'] or etc.
    this.dateStart = '';
    this.dateEnd = '';
    this.timesOfDay = [];
    this.distanceToHumansMin = '';  //config.distanceToHumans.min;
    this.distanceToHumansMax = '';  //config.distanceToHumans.max;
    this.distanceToWaterMin = '';  //config.distanceToWater.min;
    this.distanceToWaterMax = '';  //config.distanceToWater.max;
    this.user = '';

    //Default marker styles.
    this.markerColor = '#ff9900';  //For... consistency, this is coLOR instead of coLOUR.
    this.markerSize = '15';
    this.markerOpacity = '0.8';

    //These two are the most important values; they're derived from the selector
    //settings above.
    this.sql = this.calculateSql();
    this.css = this.calculateCss();
  }

  calculateSql(sqlQueryTemplate = config.cartodb.sqlQueryCountItems, specificCamera = '') {
    return sqlQueryTemplate
      .replace(/{CAMERAS}/ig, config.cartodb.sqlTableCameras)
      .replace(/{SUBJECTS}/ig, config.cartodb.sqlTableSubjects)
      .replace(/{CLASSIFICATIONS}/ig, config.cartodb.sqlTableClassifications)
      .replace(/{AGGREGATIONS}/ig, config.cartodb.sqlTableAggregations)
      .replace(/{WHERE}/ig, this.calculateSqlWhereClause(specificCamera));
  }

  calculateSqlWhereClause(specificCamera = '') {
    //The biggest variable in the SQL query is the 'WHERE' clause.

    //Where constructor: species
    let sqlWhere_species = [];
    config.species.map((item) => {
      if (this.species.indexOf(item.id) >= 0) {
        sqlWhere_species.push(`species ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_species = (sqlWhere_species.length === 0)
      ? '' : `( ${sqlWhere_species.join(' OR ')} )`;

    //Where constructor: habitats
    let sqlWhere_habitats = [];
    config.habitats.map((item) => {
      if (this.habitats.indexOf(item.id) >= 0) {
        sqlWhere_habitats.push(`veg_type ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_habitats = (sqlWhere_habitats.length === 0)
      ? '' : `(${sqlWhere_habitats.join(' OR ')})`;

    //Where constructor: seasons
    let sqlWhere_seasons = [];
    config.seasons.map((item) => {
      if (this.seasons.indexOf(item.id) >= 0) {
        sqlWhere_seasons.push(`season ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_seasons = (sqlWhere_seasons.length === 0)
      ? '' : `(${sqlWhere_seasons.join(' OR ')})`;

    //Where constructor: date range
    let sqlWhere_dates = '';
    const validDate = /^\s*\d\d\d\d[\-\/\.]?\d?\d[\-\/\.]?\d?\d\s*$/g;
    if (this.dateStart.match(validDate) && this.dateEnd.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') BETWEEN \''+this.dateStart.trim()+'\' AND \''+this.dateEnd.trim()+'\')';
    } else if (this.dateStart.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') >= \''+this.dateStart.trim()+'\')';
    } else if (this.dateEnd.match(validDate)) {
      sqlWhere_dates = '(to_timestamp(dateutc, \'MM/DD/YYYY\') <= \''+this.dateEnd.trim()+'\')';
    }
    
    //Where constructor: time(s) of day
    let sqlWhere_timesOfDay = [];
    config.timesOfDay.map((item) => {
      if (this.timesOfDay.indexOf(item.id) >= 0) {
        sqlWhere_timesOfDay.push(`time_period ILIKE \'%${item.dbName.replace(/'/, '\'\'')}%\'`);
      }
    });
    sqlWhere_timesOfDay = (sqlWhere_timesOfDay.length === 0)
      ? '' : `(${sqlWhere_timesOfDay.join(' OR ')})`;
    
    //Where constructor: distance to humans
    let sqlWhere_distanceToHumans = '';
    const validDistance = /^\d+\.?\d*$/g;
    if (this.distanceToHumansMin.match(validDistance) && this.distanceToHumansMax.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m BETWEEN \''+this.distanceToHumansMin.trim()+'\' AND \''+this.distanceToHumansMax.trim()+'\')';
    } else if (this.distanceToHumansMin.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m >= \''+this.distanceToHumansMin.trim()+'\')';
    } else if (this.distanceToHumansMax.match(validDistance)) {
      sqlWhere_distanceToHumans = '(dist_humans_m <= \''+this.distanceToHumansMax.trim()+'\')';
    }
    
    //Where constructor: distance to water
    let sqlWhere_distanceToWater = '';
    if (this.distanceToWaterMin.match(validDistance) && this.distanceToWaterMax.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m BETWEEN \''+this.distanceToWaterMin.trim()+'\' AND \''+this.distanceToWaterMax.trim()+'\')';
    } else if (this.distanceToWaterMin.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m >= \''+this.distanceToWaterMin.trim()+'\')';
    } else if (this.distanceToWaterMax.match(validDistance)) {
      sqlWhere_distanceToWater = '(dist_water_m <= \''+this.distanceToWaterMax.trim()+'\')';
    }
    
    //Where constructor: user/groups/etc
    let sqlWhere_user = (this.user.trim() === '')
      ? '': '(user_hash ILIKE \''+this.user.replace(/'/, '\'\'').trim()+'\')';
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

  calculateCss() {
    let children = '[count=0],[count=null] {marker-fill:#000;} ';

    //For presentation, TODO: give options to change styles
    //----------------
    for (let i = 0; i < 20; i++) {
      children += `[count>${i*50}] {marker-width:${(parseFloat(this.markerSize)*(1 + i / 10))};} `;
    }
    //----------------

    return config.cartodb.cssStandard
      .replace(/{LAYER}/ig, config.cartodb.sqlTableCameras)  //Actually, any ID will do
      .replace(/{MARKERCOLOR}/ig, this.markerColor)
      .replace(/{MARKEROPACITY}/ig, this.markerOpacity)
      .replace(/{MARKERSIZE}/ig, this.markerSize)
      .replace(/{CHILDREN}/ig, children);
  }

  copy() {
    let newCopy = new MapSelector();
    for (let i in this) {
      if (this.hasOwnProperty(i) && i !== 'copy') {
        newCopy[i] = this[i];
      }
    }
    return newCopy;
  }
}

//The Map controls can be set to either Guided Mode (the default with UI widgets
//like checkboxes, etc) or Advanced Mode (which exposes full SQL capabilities).
MapSelector.GUIDED_MODE = 1;
MapSelector.ADVANCED_MODE = 2;

export default MapSelector;