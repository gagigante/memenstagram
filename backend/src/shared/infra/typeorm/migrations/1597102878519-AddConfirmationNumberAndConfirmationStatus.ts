import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddConfirmationNumberAndConfirmationStatus1597102878519
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'confirmation_code',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'confirmation_status',
        type: 'bool',
        default: false,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'confirmation_code');
    await queryRunner.dropColumn('users', 'confirmation_status');
  }
}
