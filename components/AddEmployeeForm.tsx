'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const employeeSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  department: z.string().min(2),
  position: z.string().min(2),
  joinDate: z.string()
})

export default function AddEmployeeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(employeeSchema)
  })

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) throw new Error('Failed to add employee')
      reset()
    } catch (error) {
      console.error('Error adding employee:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <input
          {...register('firstName')}
          placeholder="First Name"
          className="p-2 border rounded"
        />
        <input
          {...register('lastName')}
          placeholder="Last Name"
          className="p-2 border rounded"
        />
        <input
          {...register('email')}
          placeholder="Email"
          className="p-2 border rounded"
        />
        <input
          {...register('department')}
          placeholder="Department"
          className="p-2 border rounded"
        />
        <input
          {...register('position')}
          placeholder="Position"
          className="p-2 border rounded"
        />
        <input
          {...register('joinDate')}
          type="date"
          className="p-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Employee'}
      </button>
    </form>
  )
}
