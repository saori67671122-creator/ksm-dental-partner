import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getJob(id: string) {
  const { data } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single()

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
    <main style={{ padding: '20px' }}>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>{job.location}</p>
      <p>{job.salary}</p>

      {/* 通報ボタン */}
      <form action={`/api/report`} method="POST" style={{ marginTop: '20px' }}>
        <input type="hidden" name="job_id" value={job.id} />
        <input type="hidden" name="reason" value="不正な内容" />
        <button
          type="submit"
          style={{
            background: 'red',
            color: 'white',
            padding: '10px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          この求人を通報
        </button>
      </form>
    </main>
  )
}