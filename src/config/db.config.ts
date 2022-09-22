import {DataSourceOptions} from "typeorm"

export const dataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || '',
    port: Number(process.env.DB_PORT || 5432),
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || '',
    entities: ['../src/**/**.entity.ts'],
    migrations: ['../database/migrations/*.ts'],
    synchronize: false,
} as DataSourceOptions;