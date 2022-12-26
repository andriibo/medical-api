import {MigrationInterface, QueryRunner} from 'typeorm';
import {TableColumn} from 'typeorm/schema-builder/table/TableColumn';

export class vitalFieldsNullable1672073486708 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns('vital', [
            {
                oldColumn: new TableColumn({
                    name: 'temperature',
                    type: 'decimal',
                }),
                newColumn: new TableColumn({
                    name: 'temperature',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: true,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'hr',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'hr',
                    type: 'int',
                    isNullable: true,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'spo',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'spo',
                    type: 'int',
                    isNullable: true,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'rr',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'rr',
                    type: 'int',
                    isNullable: true,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'fall',
                    type: 'boolean',
                }),
                newColumn: new TableColumn({
                    name: 'fall',
                    type: 'boolean',
                    isNullable: true,
                }),
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns('vital', [
            {
                oldColumn: new TableColumn({
                    name: 'temperature',
                    type: 'decimal',
                }),
                newColumn: new TableColumn({
                    name: 'temperature',
                    type: 'decimal',
                    precision: 5,
                    scale: 2,
                    isNullable: false,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'hr',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'hr',
                    type: 'int',
                    isNullable: false,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'spo',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'spo',
                    type: 'int',
                    isNullable: false,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'rr',
                    type: 'int',
                }),
                newColumn: new TableColumn({
                    name: 'rr',
                    type: 'int',
                    isNullable: false,
                }),
            },
            {
                oldColumn: new TableColumn({
                    name: 'fall',
                    type: 'boolean',
                }),
                newColumn: new TableColumn({
                    name: 'fall',
                    type: 'boolean',
                    isNullable: false,
                }),
            },
        ]);
    }
}
