/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(dto);
    };
}