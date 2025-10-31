class leaveService {
  constructor(leaveData, employeeData = {}) {
    this.leaveData = leaveData;
    this.employeeData = employeeData;
  }

  getAll() {
    return this.leaveData;
  }

  approveLeave(id) {
    const leave = this.leaveData.find((v) => v.id == id);
    if (!leave) return false;

    const employee = this.employeeData.find((v) => v.id == leave.employeeId);
    if (!employee) {
      leave.status = 'FAIL';
      return false;
    }

    if (employee.leaveBalance <= 0) {
      leave.status = 'FAIL';
      return false;
    }

    const startDate = new Date(leave.startDate);
    const endDate = new Date(leave.endDate);

    const diffTime = endDate - startDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;

    if (diffDays > employee.leaveBalance) {
      leave.status = 'FAIL';
      return false;
    }

    employee.leaveBalance = employee.leaveBalance - diffDays;

    this.employeeData = this.employeeData.map((v) =>
      v.id == employee.id ? employee : v
    );

    leave.status = 'APPROVED';
    this.leaveData = this.leaveData.map((v) =>
      v.id == leave.id ? leave : v
    );

    return true;
  }

  add(leaveData) {
    this.leaveData.push(leaveData);

    return this.leaveData;
  }
}

export default leaveService;
