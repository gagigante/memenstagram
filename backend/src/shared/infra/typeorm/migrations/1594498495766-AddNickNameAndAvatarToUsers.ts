import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNickNameAndAvatarToUsers1594498495766
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'nickname',
        type: 'varchar',
      }),
      new TableColumn({
        name: 'avatar_url',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'nickname');
    await queryRunner.dropColumn('users', 'avatar_url');
  }
}
