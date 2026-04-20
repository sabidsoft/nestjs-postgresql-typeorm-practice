/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './employee.entity';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }

    // Create a new employee
    @Post()
    createEmployee(@Body() dto: CreateEmployeeDto) {
        return this.employeesService.createEmployee(dto);
    };

    // Get all employees
    @Get()
    getAllEmployees(): Promise<Employee[]> {
        return this.employeesService.getAllEmployees();
    };

    // Search employees by optional query parameters (name, department)
    @Get('search')
    searchEmployees(
        @Query('name') name?: string,
        @Query('department') department?: string,
    ): Promise<Employee[]> {
        return this.employeesService.searchEmployees({ name, department });
    }

    // Get a single employee by ID
    @Get(':id')
    geteEmloyee(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeesService.getEmployee(id);
    };

    // Update an existing employee by ID
    @Patch(':id')
    updateEmployee(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateEmployeeDto
    ): Promise<Employee> {
        return this.employeesService.updateEmployee(id, dto);
    };

    // Delete an employee by ID
    @Delete(':id')
    deleteEmployee(
        @Param('id', ParseIntPipe) id: number
    ): Promise<{ message: string }> {
        return this.employeesService.deleteEmployee(id);
    };
}