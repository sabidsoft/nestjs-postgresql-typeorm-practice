/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

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

    @Patch(':id')
    updateEmployee(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEmployeeDto
    ): Promise<Employee> {
        return this.employeesService.updateEmployee(id, dto);
    };

    @Delete(':id')
    deleteEmployee(
        @Param('id', ParseIntPipe) id: number
    ): Promise<{ message: string }> {
        return this.employeesService.deleteEmployee(id);
    };
}