import { ApiProperty } from "@nestjs/swagger";

export class CourseInput {
    @ApiProperty({
        description: 'The name of the course',
        example: 'Software Development Studio 1',
        type: String,
    })
    public name: string;

    @ApiProperty({
        description: 'The description of the course',
        example: 'This course was modified for the Erasmus+ students.',
        type: String,
    })
    public description: string;

    @ApiProperty({
        description: 'The number of ECTS points of the course',
        example: 6,
        type: Number,
    })
    public ECTS: number;

    @ApiProperty({
        description: 'The semester when the course takes place',
        example: 'summer',
        type: String,
    })
    public semester: string;

    @ApiProperty({
        description: 'The link to the ECTS card of the course',
        example: 'https://www.put.poznan.pl/cards/2021_2022/Informatyka/stacjonarne/studia%20drugiego%20stopnia/Software%20Engineering%20(In%C5%BCynieria%20oprogramowania)/1/Software%20Development%20Studio%201-ang.pdf',
        type: String,
    })
    public ECTScard: string;

    @ApiProperty({
        description: 'The comma separated faculties that can take part in the course',
        example: 'Faculty of Computing, Faculty of Electronics and Telecommunications',
        type: String,
    })
    public faculties: string;

}