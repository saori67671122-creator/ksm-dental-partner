/** @type {import('next-sitemap').IConfig} */

const { createClient } = require('@supabase/supabase-js')

// 👇 修正ここ（anonキーに変更）
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

module.exports = {
  siteUrl: 'https://ksm-dental-partner.vercel.app',

  generateRobotsTxt: true,
  sitemapSize: 7000,

  changefreq: 'daily',
  priority: 0.7,

  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },

  additionalPaths: async (config) => {
    const paths = []

    // トップページ
    paths.push(await config.transform(config, '/'))

    // 👇 デバッグログ（追加）
    const { data: jobs, error } = await supabase
      .from('jobs')
      .select('id')

    console.log('jobs:', jobs)
    console.log('error:', error)

    if (error || !jobs) {
      return paths
    }

    // 👇 求人ページ追加
    jobs.forEach((job) => {
      paths.push({
        loc: `/jobs/${job.id}`,
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      })
    })

    return paths
  },
}