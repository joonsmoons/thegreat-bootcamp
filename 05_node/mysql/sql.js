module.exports = {
  employeeList: "select * from employees",
  employee: "select * from employees where emp_no = ?",

  salariesList: "select * from salaries limit 10",
  salariesInsert: "insert into salaries set ?",

  departmentUpdate: "update departments set ? where dept_no = ? ",
  departmentDelete: "delete from departments where dept_no = ?",
};
