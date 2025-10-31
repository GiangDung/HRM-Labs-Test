function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

const API_BASE = 'http://localhost:8080/api';

function clearErrors(formId) {
    const errorDiv = document.getElementById(`${formId}Error`);
    if (errorDiv) {
        errorDiv.innerHTML = '';
        errorDiv.style.display = 'none';
    }
}

function displayError(formId, message) {
    const errorDiv = document.getElementById(`${formId}Error`);
    if (errorDiv) {
        errorDiv.innerHTML = `<p class="error-message">${message}</p>`;
        errorDiv.style.display = 'block';
    }
}

document.getElementById('employeeForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors('employeeForm');

    const name = document.getElementById('empName').value.trim();
    const department = document.getElementById('empDept').value.trim();
    const leaveBalanceStr = document.getElementById('empLeave').value;
    const leaveBalance = parseInt(leaveBalanceStr);

    if (!name || !department || !leaveBalanceStr) {
        displayError('employeeForm', 'All fields are required.');
        return;
    }

    if (isNaN(leaveBalance) || leaveBalance < 0) {
        displayError('employeeForm', 'Leave Balance must be a non-negative number.');
        return;
    }

    const data = {
        id: generateUUID(),
        name: name,
        department: department,
        leaveBalance: leaveBalance
    };

    try {
        const res = await fetch(`${API_BASE}/employees`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        alert(json.message || 'Employee added successfully!');
        e.target.reset();
    } catch (error) {
        displayError('employeeForm', 'Error adding employee. Check API connection.');
        console.error('Fetch error:', error);
    }
});

document.getElementById('viewEmployees').addEventListener('click', async () => {
    const table = document.getElementById('employeeTable');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    try {
        const res = await fetch(`${API_BASE}/employees`);
        const json = await res.json();

        json.data.forEach(emp => {
            const row = `<tr>
              <td>${emp.id}</td>
              <td>${emp.name}</td>
              <td>${emp.department}</td>
              <td>${emp.leaveBalance}</td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
        table.style.display = 'table';
    } catch (error) {
        alert('Could not fetch employees. Check API connection.');
        console.error('Fetch error:', error);
    }
});

document.getElementById('leaveForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors('leaveForm');

    const employeeId = document.getElementById('leaveEmpId').value.trim();
    const startDateStr = document.getElementById('leaveStart').value;
    const endDateStr = document.getElementById('leaveEnd').value;
    const reason = document.getElementById('leaveReason').value.trim();

    if (!employeeId || !startDateStr || !endDateStr || !reason) {
        displayError('leaveForm', 'All fields are required.');
        return;
    }

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (startDate > endDate) {
        displayError('leaveForm', 'Start Date cannot be after End Date.');
        return;
    }

    const data = {
        id: generateUUID(),
        employeeId: employeeId,
        startDate: startDateStr,
        endDate: endDateStr,
        reason: reason,
        status: 'PENDING'
    };

    try {
        const res = await fetch(`${API_BASE}/leaves`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const json = await res.json();
        alert(json.message || 'Leave request submitted successfully!');
        e.target.reset();
    } catch (error) {
        displayError('leaveForm', 'Error submitting leave request. Check API connection.');
        console.error('Fetch error:', error);
    }
});

document.getElementById('viewLeaves').addEventListener('click', async () => {
    const table = document.getElementById('leaveTable');
    const tbody = table.querySelector('tbody');
    tbody.innerHTML = '';

    try {
        const res = await fetch(`${API_BASE}/leaves`);
        const json = await res.json();

        json.data.forEach(lv => {
            const row = `<tr>
              <td>${lv.id}</td>
              <td>${lv.employeeId}</td>
              <td>${lv.startDate}</td>
              <td>${lv.endDate}</td>
              <td>${lv.reason}</td>
              <td>${lv.status || 'Pending'}</td>
            </tr>`;
            tbody.insertAdjacentHTML('beforeend', row);
        });
        table.style.display = 'table';
    } catch (error) {
        alert('Could not fetch leave requests. Check API connection.');
        console.error('Fetch error:', error);
    }
});
