/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    @Post()
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(dto);
    };

    @Get()
    getAllEmployees(): Promise<Employee[]> {
        return this.employeesService.getAllEmployees();
    };

    @Get(':id')
    geteEmloyee(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeesService.getEmployee(id);
    };
}