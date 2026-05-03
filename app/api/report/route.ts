import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  const formData = await request.formData()

  const job_id = formData.get('job_id')
  const reason = formData.get('reason')

  if (!job_id) {
    return Response.json({ error: 'job_id is required' }, { status: 400 })
  }

  const { error } = await supabase.from('reports').insert([
    {
      job_id,
      reason,
    },
  ])

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  return Response.json({ success: true })
}