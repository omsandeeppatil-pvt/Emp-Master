import { PrismaClient } from '@prisma/client'
import EmployeeList from '../components/EmployeeList'
import AddEmployeeForm from '../components/AddEmployeeForm'

const prisma = new PrismaClient()

export default async function Home() {
  const employees = await prisma.employee.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Employee Master System</h1>
      <AddEmployeeForm />
      <EmployeeList initialEmployees={employees} />
    </main>
  )
}
