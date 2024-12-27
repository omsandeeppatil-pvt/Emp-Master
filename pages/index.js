import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch("/api/employees");
      const data = await res.json();
      setEmployees(data);
    }
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employee Master</h1>
      <Link href="/add">Add New Employee</Link>
      <ul>
        {employees.map((emp) => (
          <li key={emp._id}>
            {emp.name} - {emp.position}
          </li>
        ))}
      </ul>
    </div>
  );
}
