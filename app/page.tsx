import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

async function getJobs() {
  const db = await supabase.from('jobs').select('*')

  const api = await fetch('http://localhost:3000/api/jobs')
  const apiData = await api.json()

  return [...(db.data || []), ...(apiData.jobs || [])]
}

export default async function Home() {
  const jobs = await getJobs()

  return (
    <main>
      <h1>KSM Dental Partner</h1>

      {jobs.map((job: any) => (
        <div key={job.id}>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
        </div>
      ))}
    </main>
  )
}