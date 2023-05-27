import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

const PostgresErrorCode = {
    UniqueViolation: '23505',
};

export class UserAlreadyExistsError extends Error {
    constructor(username: string) {
        super(`User with username ${username} already exists`);
    }
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
    ) { }

    async getAll(): Promise<Partial<User>[]> {
        const users = await this.repository.find();
        return users.map(user => {
            const {password, ...result} = user;
            return result;
        });
    }

    async get(id: number): Promise<Partial<User>> {
        const {password, ...result} = await this.repository.findOne({ where: { id: Equal(id) } });
        return result;
    }

    async create(username: string, pass: string, isAdmin: boolean): Promise<Partial<User>> {
        try {
            const hash = await bcrypt.hash(pass, saltRounds);
            const user = this.repository.create({ username, password: hash , isAdmin});
            const {password, ...result} = await this.repository.save(user);
            return result;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new UserAlreadyExistsError(username);
            }
            throw error;
        }
    }

    async update(id: number, username: string, pass: string): Promise<Partial<User>> {
        try {
            let user = await this.get(id);
            if (username !== undefined) {
                user.username = username;
            }
            if (pass !== undefined) {
                const hash = await bcrypt.hash(pass, saltRounds);
                user.password = hash;
            }
            await this.repository.update(id, user);
            const {password, ...result} = await this.repository.findOne({ where: { id: Equal(id) } });
            return result;
        } catch (error) {
            if (error?.code === PostgresErrorCode.UniqueViolation) {
                throw new UserAlreadyExistsError(username);
            }
            throw error;
        }
    }

    async delete(id: number): Promise<boolean> {
        const res = await this.repository.delete(id);
        return res.affected > 0;
    }

    async findOne(username: string): Promise<User> {
        return await this.repository.findOne({ where: { username: Equal(username) } });
    }
}
