const Employee = require('../models/Employee');

class EmployeeService {
    constructor(repository) {
        this.repository = repository;
        this.currentId = 1;
    }

    registerEmployee(dto) {
        if (!dto.name || !dto.department || dto.salary <= 0) {
            throw new Error('Invalid employee data');
        }

        const employee = new Employee(
            this.currentId++,
            dto.name,
            dto.department,
            dto.salary
        );

        return this.repository.add(employee);
    }

    findEmployee(id) {
        const employee = this.repository.findById(id);

        if (!employee) {
            throw new Error('Employee not found');
        }

        return employee;
    }

    updateSalary(id, salary) {
        if (salary <= 0) {
            throw new Error('Invalid salary');
        }

        const employee = this.repository.updateSalary(id, salary);

        if (!employee) {
            throw new Error('Employee not found');
        }

        return employee;
    }

    deleteEmployee(id) {
        const employee = this.repository.delete(id);

        if (!employee) {
            throw new Error('Employee not found');
        }

        return employee;
    }

    getAllEmployees() {
        return this.repository.getAll();
    }
}

module.exports = EmployeeService;