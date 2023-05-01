import { ApiProperty } from "@nestjs/swagger";

export class CommentInput {
    @ApiProperty({
        description: 'The id of the course',
        example: 1,
        type: Number,
    })
    public courseId: number;

    @ApiProperty({
        description: 'The user id of the user',
        example: 1,
        type: Number,
    })
    public userId: number;

    @ApiProperty({
        description: 'The text of the comment',
        example: 'This course is very interesting.',
        type: String,
    })
    public text: string;

    @ApiProperty({
        description: 'The date of the comment',
        example: '2021-05-01',
        type: Date,
    })
    public date: Date;
    
}

export class CommentUpdate {

    @ApiProperty({
        description: 'The new text of the comment',
        example: 'This course is very interesting. And not too hard.',
        type: String,
    })
    public text: string;

    @ApiProperty({
        description: 'The date of modification of the comment',
        example: '2021-06-17',
        type: Date,
    })
    public date: Date;

}
