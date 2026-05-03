import Link from 'next/link'

async function getJobs(keyword?: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs?keyword=${keyword || ''}`,
    { cache: 'no-store' }
  )

  const data = await res.json()
  return data.jobs || []
}

export default async function Home({
  searchParams,
}: {
  searchParams?: { keyword?: string }
}) {
  const keyword = searchParams?.keyword || ''
  const jobs = await getJobs(keyword)

  return (
    <main style={{ padding: '20px' }}>
      <h1>KSM Dental Partner</h1>

      {/* 検索 */}
      <form method="GET">
        <input
          name="keyword"
          placeholder="例：歯科衛生士 東京"
          defaultValue={keyword}
        />
        <button type="submit">検索</button>
      </form>

      {/* 一覧 */}
      {jobs.map((job: any) => (
        <div key={job.id} style={{ marginTop: '20px' }}>
          <Link href={`/jobs/${job.id}`}>
            <h2 style={{ cursor: 'pointer', color: 'skyblue' }}>
              {job.title}
            </h2>
          </Link>

          <p>{job.description}</p>
          <p>{job.location}</p>
          <p>{job.salary}</p>
        </div>
      ))}
    </main>
  )
}