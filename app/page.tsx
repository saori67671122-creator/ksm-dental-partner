import Link from 'next/link'
import { headers } from 'next/headers'

// 🔥 本番でも確実に動くfetch
async function getJobs(keyword?: string) {
  const headersList = await headers()
  const host = headersList.get('host') || 'localhost:3000'
  const protocol = host.includes('localhost') ? 'http' : 'https'

  const res = await fetch(
    `${protocol}://${host}/api/jobs?keyword=${keyword || ''}`,
    {
      cache: 'no-store',
    }
  )

  // 💥 万が一の保険（落ちないように）
  if (!res.ok) {
    console.error('API error:', res.status)
    return []
  }

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

      {/* 🔍 検索フォーム */}
      <form method="GET">
        <input
          name="keyword"
          placeholder="例：歯科衛生士 東京"
          defaultValue={keyword}
        />
        <button type="submit">検索</button>
      </form>

      {/* 📄 求人一覧 */}
      {jobs.length === 0 ? (
        <p style={{ marginTop: '20px' }}>求人が見つかりません</p>
      ) : (
        jobs.map((job: any) => (
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
        ))
      )}
    </main>
  )
}