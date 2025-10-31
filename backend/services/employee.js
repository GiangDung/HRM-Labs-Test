class employeeService {
  constructor(employeeData) {
    this.employeeData = employeeData;
  }

  getAll() {
    return this.employeeData;
  }

  getById(id) {
    return this.employeeData.find((employee) => employee.id == id);
  }

  add(employeeData) {
    this.employeeData.push(employeeData);

    return this.employeeData;
  }

  deleteById(id) {
    const numericId = Number(id);
    const index = this.employeeData.findIndex(employee => employee.id == numericId);

    if (index === -1) {
      return false;
    }

    this.employeeData.splice(index, 1);
    return true;
  }
}

export default employeeService;
