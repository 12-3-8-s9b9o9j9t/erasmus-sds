import { ApiProperty } from "@nestjs/swagger";

export class CommentInput {
    @ApiProperty({
        description: 'The id of the course',
        example: 1,
        type: Number,
    })
    public courseId: number;

    @ApiProperty({
        description: 'The text of the comment',
        example: 'This course is very interesting.',
        type: String,
    })
    public text: string;

    @ApiProperty({
        description: 'The author of the comment',
        example: 'John Doe',
        type: String,
    })
    public author: string;

    @ApiProperty({
        description: 'The date of the comment',
        example: '2021-05-01',
        type: Date,
    })
    public date: Date;
    
}