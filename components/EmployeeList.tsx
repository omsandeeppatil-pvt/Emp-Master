'use client'

import { useState } from 'react'

export default function EmployeeList({ initialEmployees }) {
  const [employees, setEmployees] = useState(initialEmployees)

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Name</th>
            <th className="px-6 py-3 border-b">Email</th>
            <th className="px-6 py-3 border-b">Department</th>
            <th className="px-6 py-3 border-b">Position</th>
            <th className="px-6 py-3 border-b">Join Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td className="px-6 py-4 border-b">
                {employee.firstName} {employee.lastName}
              </td>
              <td className="px-6 py-4 border-b">{employee.email}</td>
              <td className="px-6 py-4 border-b">{employee.department}</td>
              <td className="px-6 py-4 border-b">{employee.position}</td>
              <td className="px-6 py-4 border-b">
                {new Date(employee.joinDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
