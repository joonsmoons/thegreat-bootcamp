module.exports = {
  employeeList: "select * from employees",
  employee: "select * from employees where emp_no = ?",

  salariesList: "select * from salaries limit 10",
  salariesInsert: "insert into salaries set ?",

  departmentUpdate: "update departments set ? where dept_no = ? ",
  departmentDelete: "delete from departments where dept_no = ?",
  productList: `select * from product`,
  categoryList: `select * from product_category`,
  categoryDetail: `select * from product_category where product_category_id=?`,
  categoryInsert: `insert into product_category set ?`,
  categoryUpdate: `update product_category set ? where product_category_id=?`,
  categoryDelete: `delete from product_category where product_category_id=?`,
};
