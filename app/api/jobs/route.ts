import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const keyword = searchParams.get('keyword') || ''

    console.log('==== START API /api/jobs ====')
    console.log('keyword:', keyword)

    // 現在時刻
    const now = new Date().toISOString()
    console.log('now:', now)

    // クエリ構築
    let query = supabase
      .from('jobs')
      .select('*')
      .eq('status', 'published')
      .or(`expires_at.is.null,expires_at.gt.${now}`)

    if (keyword) {
      query = query.ilike('title', `%${keyword}%`)
    }

    // 実行
    const { data, error } = await query

    // 🔥 ログ（超重要）
    console.log('==== DB RESULT ====')
    console.log('data:', data)
    console.log('error:', error)

    if (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }

    // 外部求人
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

    const result = [...(data || []), ...externalJobs]

    console.log('==== FINAL RESULT ====')
    console.log(result)

    return Response.json({
      jobs: result,
    })
  } catch (err) {
    console.error('API ERROR:', err)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}