import {DataSource, DataSourceOptions} from 'typeorm';
import {dbConnectionOptions} from './db.config';

const dataSourceOptions = {
    ...dbConnectionOptions,
    migrations: ['./database/migrations/*.ts'],
    synchronize: false,
} as DataSourceOptions;

export const connectionSource = new DataSource(dataSourceOptions);
