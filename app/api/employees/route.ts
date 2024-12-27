import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const employee = await prisma.employee.create({
      data: {
        ...data,
        joinDate: new Date(data.joinDate)
      }
    })
    return NextResponse.json(employee)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create employee' },
      { status: 500 }
    )
  }
}
