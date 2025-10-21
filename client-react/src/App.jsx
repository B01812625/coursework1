import { useState, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

// GraphQL查询和变更定义
const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
      age
      createdAt
    }
  }
`

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $age: Int) {
    createUser(name: $name, email: $email, age: $age) {
      id
      name
      email
      age
      createdAt
    }
  }
`

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $age: Int) {
    updateUser(id: $id, name: $name, email: $email, age: $age) {
      id
      name
      email
      age
      createdAt
    }
  }
`

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [age, setAge] = useState('')
  const [editingId, setEditingId] = useState(null)
  
  // 使用GraphQL查询
  const { loading, error, data, refetch } = useQuery(GET_USERS)
  
  // 使用GraphQL变更
  const [createUser] = useMutation(CREATE_USER)
  const [updateUser] = useMutation(UPDATE_USER)
  const [deleteUser] = useMutation(DELETE_USER)
  
  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        // 更新用户
        await updateUser({
          variables: {
            id: editingId,
            name,
            email,
            age: age ? parseInt(age) : null
          }
        })
        setEditingId(null)
      } else {
        // 创建用户
        await createUser({
          variables: {
            name,
            email,
            age: age ? parseInt(age) : null
          }
        })
      }
      
      // 重置表单
      setName('')
      setEmail('')
      setAge('')
      
      // 重新获取用户列表
      refetch()
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }
  
  // 处理编辑用户
  const handleEdit = (user) => {
    setEditingId(user.id)
    setName(user.name)
    setEmail(user.email)
    setAge(user.age || '')
  }
  
  // 处理删除用户
  const handleDelete = async (id) => {
    try {
      await deleteUser({ variables: { id } })
      refetch()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }
  
  // 取消编辑
  const handleCancelEdit = () => {
    setEditingId(null)
    setName('')
    setEmail('')
    setAge('')
  }
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div className="app">
      <h1>GraphQL React Client</h1>
      
      {/* 用户表单 */}
      <div className="user-form">
        <h2>{editingId ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age (optional)</label>
            <input
              type="number"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit">{editingId ? 'Update User' : 'Create User'}</button>
          {editingId && (
            <button type="button" onClick={handleCancelEdit}>Cancel</button>
          )}
        </form>
      </div>
      
      {/* 用户列表 */}
      <h2>Users</h2>
      <div className="users-list">
        {data.users.map(user => (
          <div key={user.id} className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            {user.age && <p>Age: {user.age}</p>}
            <p>Created: {new Date( parseInt(user.createdAt) ).toLocaleString()}</p>
            <div className="user-actions">
              <button className="edit-btn" onClick={() => handleEdit(user)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App