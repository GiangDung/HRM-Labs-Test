import express from 'express';
import leaveService from '../services/leave.js';
import { leavesData, employeesData } from '../main.js';

const leaveRouter = express.Router();

leaveRouter.post('/', (req, res) => {
  try {
    const leave = req.body;
    if (!leave) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const allowedFields = ['id', 'employeeId', 'startDate', 'endDate', 'reason', 'status'];
    const leaveStatus = ['PENDING'];
    const dataKeys = Object.keys(leave);
    const allKeysValid = dataKeys.every(key => allowedFields.includes(key));
    const requiredFieldsPresent = allowedFields.every(key => dataKeys.includes(key));

    if (!allKeysValid || !requiredFieldsPresent) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!leave.id) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!leave.employeeId) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (typeof leave.startDate !== 'string' || !leave.startDate) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (typeof leave.endDate !== 'string' || !leave.endDate) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (typeof leave.reason !== 'string' || !leave.reason) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    if (!leaveStatus.includes(leave.status)) {
      return res.status(400).json({
        'statusCode': 400,
        'error': 'Bad Request',
      });
    }

    const leaveServicer = new leaveService(leavesData);
    leaveServicer.add(leave);

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

leaveRouter.get('/', (req, res) => {
  try {
    const leaveServicer = new leaveService(leavesData);
    const allLeaves = leaveServicer.getAll();

    return res.status(200).json({
      'statusCode': 200,
      'data': allLeaves,
      'message': 'Success',
    });
  } catch (error) {
    return res.status(500).json({
      'statusCode': 500,
      'error': 'Internal Server Error',
    });
  }
});

leaveRouter.patch('/:id/approve', (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
      });
    }

    const leaveServicer = new leaveService(leavesData, employeesData);
    const success = leaveServicer.approveLeave(id);
    console.log(success);

    if (!success) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Bad Request',
      });
    }

    return res.status(200).json({
      statusCode: 200,
      message: 'Success',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      statusCode: 500,
      error: 'Internal Server Error',
    });
  }
});

export default leaveRouter;
