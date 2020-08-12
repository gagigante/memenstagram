import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPostsFollowersFollowsToUser1597191172150
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('users', [
      new TableColumn({
        name: 'posts_qtt',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'followers_qtt',
        type: 'integer',
        default: 0,
      }),
      new TableColumn({
        name: 'follows_qtt',
        type: 'integer',
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'posts_qtt');
    await queryRunner.dropColumn('users', 'followers_qtt');
    await queryRunner.dropColumn('users', 'follows_qtt');
  }
}
