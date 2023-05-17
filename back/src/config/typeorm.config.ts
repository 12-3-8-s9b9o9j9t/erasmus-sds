import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Course } from "src/courses/course.entity";
import { User } from "src/users/user.entity";
import { Comment } from "src/comments/comment.entity";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'db',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'sdsDB',
    // entities: [
    //     __dirname + '/../**/*.entity.{js,ts}'
    // ],
    autoLoadEntities: true,
    synchronize: true,
}