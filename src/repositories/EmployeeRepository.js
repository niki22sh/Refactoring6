class EmployeeRepository {
    constructor() {
        this.employees = [];
    }

    add(employee) {
        this.employees.push(employee);
        return employee;
    }

    findById(id) {
        return this.employees.find(emp => emp.id === id);
    }

    getAll() {
        return this.employees;
    }

    updateSalary(id, salary) {
        const employee = this.findById(id);

        if (employee) {
            employee.salary = salary;
        }

        return employee;
    }

    delete(id) {
        const index = this.employees.findIndex(emp => emp.id === id);

        if (index !== -1) {
            return this.employees.splice(index, 1)[0];
        }

        return null;
    }
}

module.exports = EmployeeRepository;