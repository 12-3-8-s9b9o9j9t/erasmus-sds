import { ApiProperty } from "@nestjs/swagger";

export class Login {

    @ApiProperty({
        description: 'The username of the user',
        example: 'John Doe',
        type: String,
    })
    public username: string;
    
    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
        type: String,
    })
    public password: string;
}