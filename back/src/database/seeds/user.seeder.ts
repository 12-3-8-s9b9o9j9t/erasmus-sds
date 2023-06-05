import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { User } from "src/users/user.entity";
import * as bcrypt from 'bcrypt';
import { saltRounds } from "src/users/users.service";

export default class UserSeeder implements Seeder {
    async run(dataSource: DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        const repository = dataSource.getRepository(User)

        // add a user admin only if it does not exist
        if (await repository.count() != 0) {
            return ;
        }

        const user = { username: "admin", password: await bcrypt.hash("admin", saltRounds), isAdmin: true };

        await repository.insert([user]);

        console.log("Finish seed admin user");
    }
    
}