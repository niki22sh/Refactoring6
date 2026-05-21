class EmployeeController {
    constructor(service) {
        this.service = service;
    }

    register(dto) {
        return this.service.registerEmployee(dto);
    }

    find(id) {
        return this.service.findEmployee(id);
    }

    updateSalary(id, salary) {
        return this.service.updateSalary(id, salary);
    }

    delete(id) {
        return this.service.deleteEmployee(id);
    }

    getAll() {
        return this.service.getAllEmployees();
    }
}

module.exports = EmployeeController;