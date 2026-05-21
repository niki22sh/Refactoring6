const EmployeeRepository = require('../src/repositories/EmployeeRepository');
const EmployeeService = require('../src/services/EmployeeService');
const EmployeeDTO = require('../src/dto/EmployeeDTO');

describe('EmployeeService Tests', () => {

    let repository;
    let service;

    beforeEach(() => {
        repository = new EmployeeRepository();
        service = new EmployeeService(repository);
    });

    test('Register employee successfully', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', 20000);

        const employee = service.registerEmployee(dto);

        expect(employee.name).toBe('Ivan');
    });

    test('Fail registration with invalid salary', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', -1);

        expect(() => {
            service.registerEmployee(dto);
        }).toThrow('Invalid employee data');
    });

    test('Find employee successfully', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', 20000);

        const employee = service.registerEmployee(dto);

        const found = service.findEmployee(employee.id);

        expect(found.name).toBe('Ivan');
    });

    test('Fail find nonexistent employee', () => {
        expect(() => {
            service.findEmployee(100);
        }).toThrow('Employee not found');
    });

    test('Update salary successfully', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', 20000);

        const employee = service.registerEmployee(dto);

        const updated = service.updateSalary(employee.id, 40000);

        expect(updated.salary).toBe(40000);
    });

    test('Fail update with invalid salary', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', 20000);

        const employee = service.registerEmployee(dto);

        expect(() => {
            service.updateSalary(employee.id, -500);
        }).toThrow('Invalid salary');
    });

    test('Delete employee successfully', () => {
        const dto = new EmployeeDTO('Ivan', 'IT', 20000);

        const employee = service.registerEmployee(dto);

        service.deleteEmployee(employee.id);

        expect(repository.getAll().length).toBe(0);
    });

    test('Fail delete nonexistent employee', () => {
        expect(() => {
            service.deleteEmployee(99);
        }).toThrow('Employee not found');
    });
});