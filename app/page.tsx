import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: jobs, error } = await supabase.from('jobs').select('*')

  return (
    <main style={{ padding: 20 }}>
      <h1>KSM Dental Partner</h1>

      {jobs?.map((job) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))}

      {error && <p>エラー: {JSON.stringify(error)}</p>}
    </main>
  )
}