import express from 'express';
import employeesRouter from './routers/employee.js';
import leaveRouter from './routers/leave.js';
import cors from 'cors';

const PORT = 8080;

const employeesData = [];
const leavesData = [];

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/employees', employeesRouter);
app.use('/api/leaves', leaveRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {employeesData, leavesData};
