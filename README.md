# GraphQL + React + Node.js + MongoDB + Svelte 示例项目

这是一个完整的全栈项目示例，展示了如何使用GraphQL、React、Node.js、MongoDB和Svelte构建现代Web应用程序。

## 项目结构

```
├── server/              # Node.js GraphQL服务器
│   ├── graphql/         # GraphQL相关代码
│   │   ├── typeDefs.js  # GraphQL类型定义
│   │   └── resolvers.js # GraphQL解析器
│   ├── models/          # MongoDB模型
│   │   └── User.js      # 用户模型
│   └── index.js         # 服务器入口
├── client-react/        # React客户端
│   ├── src/             # React源代码
│   └── ...              # React项目配置
├── client-svelte/       # Svelte客户端
│   ├── src/             # Svelte源代码
│   └── ...              # Svelte项目配置
└── package.json         # 项目配置
```

## 技术栈

- **后端**：
  - Node.js
  - Express
  - GraphQL (Apollo Server)
  - MongoDB (Mongoose)

- **前端**：
  - React (使用Apollo Client)
  - Svelte (使用svelte-apollo)
  - Vite (构建工具)

## 功能特性

- 用户管理（创建、读取、更新、删除）
- GraphQL API接口
- 双前端实现（React和Svelte）
- 响应式UI设计

## 快速开始

### 前提条件

确保你的系统已安装以下软件：
- Node.js (v14+)
- MongoDB (v4+)

### 安装步骤

1. 克隆项目（或直接下载）

2. 安装依赖
```bash
npm run install-all
```

3. 启动MongoDB服务

4. 运行项目
```bash
# 启动所有服务（服务器、React客户端、Svelte客户端）
npm run dev

# 或者单独启动
# 启动服务器
npm run server
# 启动React客户端
npm run client-react
# 启动Svelte客户端
npm run client-svelte
```

### 访问地址

- GraphQL Playground: http://localhost:5000/graphql
- React客户端: http://localhost:3000
- Svelte客户端: http://localhost:3001

## 使用说明

### GraphQL API

#### 查询
```graphql
query {
  users {
    id
    name
    email
    age
    createdAt
  }
}

query {
  user(id: "YOUR_USER_ID") {
    id
    name
    email
    age
    createdAt
  }
}
```

#### 变更
```graphql
mutation {
  createUser(name: "John Doe", email: "john@example.com", age: 30) {
    id
    name
    email
    age
    createdAt
  }
}

mutation {
  updateUser(id: "YOUR_USER_ID", name: "John Updated", email: "john.updated@example.com") {
    id
    name
    email
    age
    createdAt
  }
}

mutation {
  deleteUser(id: "YOUR_USER_ID")
}
```

## 注意事项

1. 确保MongoDB服务正在运行，并且连接字符串正确（默认为mongodb://localhost:27017/graphql_example）
2. 三个服务运行在不同的端口上：服务器(5000)、React客户端(3000)、Svelte客户端(3001)
3. 两个前端客户端提供相同的功能，只是使用不同的框架实现