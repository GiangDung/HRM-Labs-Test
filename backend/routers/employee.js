import express from 'express';
import employeeService from '../services/employee.js';
import { employeesData } from '../main.js';

const employeesRouter = express.Router();

employeesRouter.get('/', (req, res) => {
  try {
    const employeeServicer= new employeeService(employeesData);
    const employees = employeeServicer.getAll();

    const resData = {
      'statusCode': 200,
      'data': employees,
      'message': 'Success',
    }

    return res.status(200).json(resData);
  } catch (error) {
    return res.status(500).json({
      'statusCode': 500,
      'error': 'Internal Server Error',
    });
  }
});

employeesRouter.post('/', (req, res) => {
  try {
    const employee = req.body;
    if (!employee) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const allowedFields = ['id', 'name', 'department', 'leaveBalance'];
    const dataKeys = Object.keys(employee);
    const allKeysValid = dataKeys.every(key => allowedFields.includes(key));
    const requiredFieldsPresent = allowedFields.every(key => dataKeys.includes(key));

    if (!allKeysValid && !requiredFieldsPresent) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!employee.id) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!typeof employee.name == 'string' || !employee.name) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!typeof employee.department == 'string' || !employee.department) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!Number.isInteger(employee.leaveBalance) || !employee.leaveBalance) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const employeeServicer= new employeeService(employeesData);
    employeeServicer.add(employee);
    return res.status(201).json({
      'statusCode': 201,
      'message': 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      'statusCode': 500,
      'error': 'Internal Server Error',
    });
  }
});

employeesRouter.get('/:id', (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const employeeServicer= new employeeService(employeesData);

    const employee = employeeServicer.getById(employeeId);
    if (!employee) {
      return res.status(404).json({
        'statusCode': 404,
        'error': 'Not Found',
      });
    }

    return res.status(200).json({
      'statusCode': 200,
      'data': employee,
      'message': 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      'statusCode': 500,
      'error': 'Internal Server Error',
    });
  }
});

employeesRouter.delete('/:id', (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const employeeServicer= new employeeService(employeesData);

    const employee = employeeServicer.deleteById(employeeId);
    if (!employee) {
      return res.status(404).json({
        'statusCode': 404,
        'error': 'Not Found',
      });
    }

    return res.status(200).json({
      'statusCode': 200,
      'message': 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      'statusCode': 500,
      'error': 'Internal Server Error',
    });
  }
});

export default employeesRouter;
