import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddIsPasswordResetedFieldToUsers1598201174960
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'is_reseted',
        type: 'bool',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'is_reseted');
  }
}
