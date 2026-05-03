import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getJob(id: string) {
  console.log("URLのID:", id)

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

  console.log("DBデータ:", data)
  console.log("DBエラー:", error)

  return data
}

export default async function JobDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const job = await getJob(id)

  if (!job) return <div>求人が見つかりません</div>

  return (
    <main>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>
    </main>
  )
}