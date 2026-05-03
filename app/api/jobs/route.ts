import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const keyword = searchParams.get('keyword') || ''

  // Supabaseから取得
  let query = supabase
  .from('jobs')
  .select('*')
  .eq('status', 'published')

  if (keyword) {
    query = query.ilike('title', `%${keyword}%`)
  }

  const { data, error } = await query

  if (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }

  // 外部API（仮）
  const externalJobs = [
    {
      id: 'ext-1',
      title: '外部求人テスト',
      description: 'APIから取得したデータ',
      location: '東京都',
      salary: '月給30万円',
      status: 'published', 
    },
  ]

  return Response.json({
    jobs: [...(data || []), ...externalJobs],
  })
}