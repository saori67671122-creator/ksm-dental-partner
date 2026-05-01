export async function GET() {
  return Response.json({
    jobs: [
      {
        id: 1,
        title: "外部求人テスト",
        description: "APIから取得したデータ",
      },
    ],
  })
}