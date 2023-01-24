import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";


export class CreateusuarioDto {


    @IsString()
    @MinLength(1)
    name: string;

    @IsString()
    @MinLength(1)
    ocupation: string;

    @IsString()
    @MinLength(1)
    company: string;


    @IsNumber()
    @IsPositive()
    age: number;


    @IsString()
    @MinLength(1)
    functions: string;



}
