/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ) { }

    // Create a new employee and save it to the database
    createEmployee(dto: CreateEmployeeDto) {
        const employee = this.employeeRepository.create(dto);
        return this.employeeRepository.save(employee);
    };

    // Retrieve all employees from the database
    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();
    };

    // Get a single employee by ID
    async getEmployee(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id });

        // Throw error if employee is not found
        if (!employee)
            throw new NotFoundException(`Employee witd ID ${id} not found`);

        return employee;
    };

    // Update an existing employee by ID
    async updateEmployee(id: number, dto: UpdateEmployeeDto): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id });

        // Throw error if employee does not exist
        if (!employee) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        // Merge existing data with new data
        this.employeeRepository.merge(employee, dto);

        // Save updated employee
        return this.employeeRepository.save(employee);
    };

    // Delete an employee by ID
    async deleteEmployee(id: number): Promise<{ message: string }> {
        const result = await this.employeeRepository.delete(id);

        // If no rows were affected, employee was not found
        if (result.affected === 0) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        return { message: `Employee with ID ${id} has been deleted successfully` };
    };

    // Search employees dynamically by name and/or department
    searchEmployees(filters: { name?: string, department?: string }): Promise<Employee[]> {
        // Create a query builder for dynamic queries
        const query = this.employeeRepository.createQueryBuilder('employee');

        // Case-insensitive partial search by name
        if (filters.name) {
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });
        }

        // Exact match search by department
        if (filters.department) {
            query.andWhere('employee.department = :dept', { dept: filters.department });
        }

        // Execute query and return results
        return query.getMany();
    }
}