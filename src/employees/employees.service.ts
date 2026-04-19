/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';

@Injectable()
export class EmployeesService {
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ) { }

    createEmployee(dto: CreateEmployeeDto) {
        const employee = this.employeeRepository.create(dto);
        return this.employeeRepository.save(employee);
    };

    getAllEmployees(): Promise<Employee[]> {
        return this.employeeRepository.find();
    };

    async getEmployee(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id });

        if (!employee)
            throw new NotFoundException(`Employee witd ID ${id} not found`);

        return employee;
    };
}