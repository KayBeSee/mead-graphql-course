const users = [
    {
      id: '1',
      name: 'Kevin',
      email: 'KayBeSee@gmail.com'
    },
    {
      id: '2',
      name: 'Sarah',
      email: 'sarah@example.com'
    },
    {
      id: '3',
      name: 'Mike',
      email: "Mike@example.com"
    }
  ];
  
  const posts = [
    {
      id: '1',
      title: 'My First Post',
      body: 'This is my first post. Woot!',
      published: false,
      author: '1'
    },
    {
      id: '2',
      title: 'My Second Post',
      body: 'This is my second post. Woot!',
      published: true,
      author: '1'
    },
    {
      id: '3',
      title: 'My Third Post',
      body: 'This is my third post. Woot!',
      published: true,
      author: '2'
    },
    {
      id: '4',
      title: 'My Fourth Post',
      body: 'This is my fourth post. Woot!',
      published: true,
      author: '3'
    }
  ];
  
  const comments = [
    {
      id: '1',
      text: 'My first comment',
      author: '1',
      post: '1'
    },
    {
      id: '2',
      text: 'My second comment',
      author: '1',
      post: '2'
    },
    {
      id: '3',
      text: 'My third comment',
      author: '1',
      post: '3'
    },
    {
      id: '4',
      text: 'My fourth comment',
      author: '2',
      post: '3'
    },
  ]

  const db = {
      users,
      posts,
      comments
  }

export {db as default};