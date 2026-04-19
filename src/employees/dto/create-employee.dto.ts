/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
    @IsOptional()
    @IsString()
    name!: string;

    @IsOptional()
    @IsString()
    position?: string;

    @IsOptional()
    @IsString()
    department?: string;
}