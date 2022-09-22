import {DataSource} from "typeorm"
import {dataSourceOptions} from './db.config';

export const connectionSource = new DataSource(dataSourceOptions);