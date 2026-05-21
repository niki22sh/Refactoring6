const EmployeeRepository = require('./repositories/EmployeeRepository');
const EmployeeService = require('./services/EmployeeService');
const EmployeeController = require('./controllers/EmployeeController');
const EmployeeDTO = require('./dto/EmployeeDTO');

const repository = new EmployeeRepository();
const service = new EmployeeService(repository);
const controller = new EmployeeController(service);

try {
    const employee1 = controller.register(
        new EmployeeDTO('Ivan Petrenko', 'IT', 25000)
    );

    const employee2 = controller.register(
        new EmployeeDTO('Maria Kovalenko', 'HR', 18000)
    );

    console.log('Employees added:');
    console.log(employee1);
    console.log(employee2);

    console.log('\nFind employee:');
    console.log(controller.find(1));

    console.log('\nUpdate salary:');
    console.log(controller.updateSalary(1, 30000));

    console.log('\nAll employees:');
    console.log(controller.getAll());

    console.log('\nDelete employee:');
    console.log(controller.delete(2));

    console.log('\nFinal list:');
    console.log(controller.getAll());

} catch (error) {
    console.error(error.message);
}