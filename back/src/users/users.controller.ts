import { Body, Controller, Delete, Get, HttpException, HttpStatus, Patch, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserAlreadyExistsError, UsersService } from './users.service';
import { User } from './user.entity';
import { UserInput } from './user.input';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(
        private service: UsersService,
    ) {}

    @Get()
    public async getAll(): Promise<Partial<User>[]> {
        return this.service.getAll();
    }

    @Get(':id')
    public async get(@Param('id') id: number): Promise<Partial<User>> {
        const user = await this.service.get(id);
        if (user === null) {
            throw new HttpException('User with id ' + id + ' not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Get('name/:name')
    public async getByName(@Param(':name') name: string): Promise<Partial<User>> {
        const user = await this.service.findOne(name);
        if (user === null) {
            throw new HttpException('User with name ' + name + ' not found', HttpStatus.NOT_FOUND);
        }
        return user;
    }

    @Post()
    public async create(@Body() input: UserInput): Promise<Partial<User>> {
        try {
            return await this.service.create(
                input.username,
                input.password);
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Patch(':id')
    public async update(@Param('id') id: number, @Body() input: UserInput): Promise<Partial<User>> {
        try {
            return await this.service.update(
                id,
                input.username,
                input.password);
        }
        catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                throw new HttpException(error.message, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Delete(':id')
    public async delete(@Param('id') id: number): Promise<boolean> {
        return this.service.delete(id);
    }
}
