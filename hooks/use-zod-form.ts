import { UseMutateFunction } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { DefaultValues, FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'

const useZodForm = <TValues extends FieldValues>(
  schema: z.ZodType<TValues>,
  mutation: UseMutateFunction<unknown, Error, TValues, unknown>,
  defaultValues?: DefaultValues<TValues>
) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<TValues>({
    resolver: zodResolver(schema as never) as never,
    defaultValues,
  })

  const onFormSubmit = handleSubmit(async (values) => mutation({ ...values }))
  return {
    register,
    errors,
    onFormSubmit,
    watch,
    reset,
  }
}

export default useZodForm
