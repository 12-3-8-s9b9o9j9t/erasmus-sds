import { Course } from '../courses/course.entity';
import { Comment } from '../comments/comment.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions, runSeeder, runSeeders } from 'typeorm-extension';
import { User } from '../users/user.entity';
import CourseSeeder from './seeds/course.seeder';


export async function seeding() {
    const options: DataSourceOptions & SeederOptions = {
        type: 'postgres',
        database: 'sdsDB',
        username: 'postgres',
        password: 'postgres',
        host: 'localhost',
        port: 5432,
        entities: [Course, Comment, User],

        seeds: ['src/database/seeds/**/*{.ts,.js}'],
    };

    const dataSource = new DataSource(options);
    await dataSource.initialize();

    await runSeeder(dataSource, CourseSeeder);
};

