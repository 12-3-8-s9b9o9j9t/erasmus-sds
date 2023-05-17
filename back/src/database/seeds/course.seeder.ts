import { Course } from "../../courses/course.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { courseData } from "../course.data";

export default class CourseSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(Course)

        // seed database only if there are no courses inside
        if (await repository.count() != 0) {
            return ;
        }

        await repository.insert(courseData);

        console.log("Finish seed courses")
    }
    
}