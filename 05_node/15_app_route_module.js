const express = require("express");
require("dotenv").config({ path: `mysql/.env.test` });
const employeeRoute = require("./routes/employee");
const departmentRoute = require("./routes/department");
const salaryRoute = require("./routes/salary");

const app = express();
app.listen(3000, () => {
  console.log("listening to port 3000...");
});

app.use("/api/employee", employeeRoute);
app.use("/api/department", departmentRoute);
app.use("/api/salary", salaryRoute);
