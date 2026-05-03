import { z } from 'zod'

export const jobSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  description: z.string().min(1, '仕事内容は必須です'),
  location: z.string().min(1, '勤務地は必須です'),
  salary: z.string().min(1, '給与は必須です'),

  trial_period: z.coerce.boolean(),

  smoking_policy: z
    .string()
    .min(1, '受動喫煙対策の記載は必須です'),

  overtime_pay: z
    .string()
    .min(1, '固定残業代の詳細は必須です'),
})