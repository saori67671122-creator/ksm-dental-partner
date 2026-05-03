'use client'
import { useState } from 'react'

export default function PostPage() {
  const [error, setError] = useState<any>(null)

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = {
      title: e.target.title.value,
      description: e.target.description.value,
      location: e.target.location.value,
      salary: e.target.salary.value,
      trial_period: e.target.trial_period.checked,
      smoking_policy: e.target.smoking_policy.value,
      overtime_pay: e.target.overtime_pay.value,
    }

    const res = await fetch('/api/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // ← 重要
      },
      body: JSON.stringify(formData),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error)
      return
    }

    alert('登録成功！')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="タイトル" />
      <input name="description" placeholder="仕事内容" />
      <input name="location" placeholder="勤務地" />
      <input name="salary" placeholder="給与" />

      <label>
        試用期間あり
        <input type="checkbox" name="trial_period" />
      </label>

      <input name="smoking_policy" placeholder="受動喫煙対策" />
      <input name="overtime_pay" placeholder="固定残業代" />

      <button type="submit">投稿</button>

      {/* エラー表示 */}
      {error && (
        <div style={{ color: 'red' }}>
          {JSON.stringify(error)}
        </div>
      )}
    </form>
  )
}