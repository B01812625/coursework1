# GraphQL + React + Node.js + MongoDB + Svelte 示例项目

This is a complete full-stack project example that demonstrates how to build a modern web application using GraphQL, React, Node.js, MongoDB, and Svelte.

## Project Structure

```
├── server/              # Node.js GraphQL sever
│   ├── graphql/         # GraphQL Relevant code
│   │   ├── typeDefs.js  # GraphQL Type definition
│   │   └── resolvers.js # GraphQL parser
│   ├── models/          # MongoDB model
│   │   └── User.js      # User Model
│   └── index.js         # Server entrance
├── client-react/        # React client Sever
│   ├── src/             # React source code
│   └── ...              # React Project configuration
├── client-svelte/       # Svelte client-side
│   ├── src/             # Svelte source code
│   └── ...              # Svelte Project Configuration
└── package.json         # Project Configuration
```

## Technology stack

- **backend**：
  - Node.js
  - Express
  - GraphQL (Apollo Server)
  - MongoDB (Mongoose)

- **frontend**：
  - React (Apollo Client)
  - Svelte (svelte-apollo)
  - Vite (Build tool)

## Functional features

- User management (create, read, update, delete)
- GraphQL API interface
- Dual frontend implementation（React and Svelte）
- Responsive UI Design

## Quick Start

### Precondition

Make sure your system has the following software installed:
- Node.js (v14+)
- MongoDB (v4+)

### Installation steps

1. Clone the project (or download it directly)

2. Install dependencies
```bash
npm run install-all
```

3. Start the MongoDB service

4.Run the project
```bash
# Start all services (server, React client, Svelte client)
npm run dev

# or start separately
# Start the server
npm run server
# Start the React client
npm run client-react
# Start the Svelte client
npm run client-svelte
```

### Access address

- GraphQL Playground: http://localhost:5000/graphql
- React client: http://localhost:3000
- Svelte client: http://localhost:3001

## Instructions for Use

### GraphQL API

#### Query
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

#### change
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

##Notes
1. Ensure that the MongoDB service is running and the connection string is correct (the default is mongodb://localhost:27017/graphql_example)
2. The three services run on different ports: server (5000), React client (3000), Svelte client (3001)
3. The two front-end clients provide the same functionality, but are implemented using different frameworks
