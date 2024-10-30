import Link from 'next/link'

export default function Posts() {
    const posts = [
      { id: 1, title: '认识 Next.js', date: '2024-03-01' },
      { id: 2, title: 'React Hooks 最佳实践', date: '2024-03-05' },
      { id: 3, title: '服务端渲染的优势', date: '2024-03-10' },
    ]
  
    return (
      <div className="min-h-screen bg-gray-100">
        <main className="max-w-4xl mx-auto py-8 px-4">
          <h1 className="text-3xl font-bold mb-6">文章列表</h1>
          <div className="space-y-4">
            {posts.map(post => (
              <article key={post.id} className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600">{post.date}</p>
              </article>
            ))}
          </div>

          <Link 
            href="/"
            className="inline-block mt-6 text-blue-500 hover:underline"
          >
            返回首页
          </Link>
        </main>
      </div>
    )
  }
  