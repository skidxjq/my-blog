// pages/api/todos.js

// 在内存中存储todos数据
const store = {
  todos: [
    { id: 1, title: '学习 Next.js', completed: false, createdAt: new Date().toISOString() },
    { id: 2, title: '写一篇博客', completed: true, createdAt: new Date().toISOString() }
  ],
  currentId: 2
};

export default async function handler(req, res) {
  // 模拟网络延迟
  await new Promise(resolve => setTimeout(resolve, 200));

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        
        return res.status(200).json({
          data: store.todos.slice(start, end),
          pagination: {
            total: store.todos.length,
            page,
            pageSize,
            totalPages: Math.ceil(store.todos.length / pageSize)
          }
        });
      }

      case 'POST': {
        const { title } = req.body;
        
        if (!title?.trim()) {
          return res.status(400).json({ message: '标题不能为空' });
        }

        const newTodo = {
          id: ++store.currentId,
          title: title.trim(),
          completed: false,
          createdAt: new Date().toISOString()
        };

        store.todos.unshift(newTodo);
        return res.status(201).json(newTodo);
      }

      case 'PUT': {
        const { id, completed } = req.body;
        
        if (id == null || completed == null) {
          return res.status(400).json({ message: '参数错误' });
        }

        const todoIndex = store.todos.findIndex(todo => todo.id === id);
        
        if (todoIndex === -1) {
          return res.status(404).json({ message: '待办事项不存在' });
        }

        store.todos[todoIndex] = {
          ...store.todos[todoIndex],
          completed,
          updatedAt: new Date().toISOString()
        };

        return res.status(200).json(store.todos[todoIndex]);
      }

      case 'DELETE': {
        const todoId = parseInt(req.query.id);
        
        if (!todoId) {
          return res.status(400).json({ message: '缺少ID参数' });
        }

        const initialLength = store.todos.length;
        store.todos = store.todos.filter(todo => todo.id !== todoId);

        if (store.todos.length === initialLength) {
          return res.status(404).json({ message: '待办事项不存在' });
        }

        return res.status(200).json({ message: '删除成功' });
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
        return res.status(405).json({ message: `Method ${method} Not Allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: '服务器错误',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}