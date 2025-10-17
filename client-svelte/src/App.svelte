<script>
  import { gql } from '@apollo/client'
  import { client } from './main.js'

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

  // 表单状态
  let name = ''
  let email = ''
  let age = ''
  let editingId = null
  
  // 用户数据状态
  let users = []
  let loading = false
  let error = null
  
  // 获取用户数据
  async function fetchUsers() {
    loading = true
    error = null
    try {
        const result = await client.query({
          query: GET_USERS
        });
        users = result.data?.users || [];
      } catch (err) {
      error = err
    } finally {
      loading = false
    }
  }
  
  // 组件挂载时获取数据
  import { onMount } from 'svelte'
  onMount(() => {
    fetchUsers()
  })

  // 处理表单提交
  async function handleSubmit(e) {
    e.preventDefault()
    
    try {
      if (editingId) {
        // 更新用户
        await client.mutate({
          mutation: UPDATE_USER,
          variables: {
            id: editingId,
            name,
            email,
            age: age ? parseInt(age) : null
          }
        })
        editingId = null
      } else {
        // 创建用户
        await client.mutate({
          mutation: CREATE_USER,
          variables: {
            name,
            email,
            age: age ? parseInt(age) : null
          }
        })
      }
      
      // 重置表单
      name = ''
      email = ''
      age = ''
      
      // 重新获取用户列表
      fetchUsers()
    } catch (err) {
      console.error('Error submitting form:', err)
    }
  }

  // 处理编辑用户
  function handleEdit(user) {
    editingId = user.id
    name = user.name
    email = user.email
    age = user.age || ''
  }

  // 处理删除用户
  async function handleDelete(id) {
    try {
      await client.mutate({
        mutation: DELETE_USER,
        variables: { id }
      })
      fetchUsers()
    } catch (err) {
      console.error('Error deleting user:', err)
    }
  }

  // 取消编辑
  function handleCancelEdit() {
    editingId = null
    name = ''
    email = ''
    age = ''
  }
</script>

<div class="app">
  <h1>GraphQL Svelte Client</h1>
  
  <!-- 用户表单 -->
  <div class="user-form">
    <h2>{editingId ? 'Edit User' : 'Create User'}</h2>
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
        />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
        />
      </div>
      <div class="form-group">
        <label for="age">Age (optional)</label>
        <input
          type="number"
          id="age"
          bind:value={age}
        />
      </div>
      <button type="submit">{editingId ? 'Update User' : 'Create User'}</button>
      {#if editingId}
        <button type="button" on:click={handleCancelEdit}>Cancel</button>
      {/if}
    </form>
  </div>
  
  <!-- 用户列表 -->
  <h2>Users</h2>
  
  {#if loading}
    <p>Loading...</p>
  {:else if error}
    <div class="error">
      <p>Error fetching data: {error.message || 'Unknown error'}</p>
    </div>
  {:else}
    
    <div class="users-list">
      {#if Array.isArray(users) && users.length > 0}
        {#each users as user}
          <div class="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            {#if user.age}
              <p>Age: {user.age}</p>
            {/if}
            <p>Created: {new Date(user.createdAt).toLocaleDateString()}</p>
            <div class="user-actions">
              <button class="edit-btn" on:click={() => handleEdit(user)}>Edit</button>
              <button class="delete-btn" on:click={() => handleDelete(user.id)}>Delete</button>
            </div>
          </div>
        {/each}
      {:else}
        <p>No users found in database</p>
        <button on:click={fetchUsers}>Refresh</button>
      {/if}
    </div>
  {/if}
</div>

<style>
  .app {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 1280px;
    margin: 0 auto;
  }

  h1, h2 {
    margin-bottom: 1.5rem;
    text-align: center;
  }

  .user-form {
    margin-bottom: 2rem;
    padding: 1.5rem;
    background: #f9f9f9;
    border-radius: 8px;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
    margin-right: 0.5rem;
  }

  button:hover {
    background: #0056b3;
  }

  .users-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1rem;
    margin-top: 2rem;
  }

  .user-card {
    background: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
  }

  .user-actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .delete-btn {
    background: #dc3545;
  }

  .delete-btn:hover {
    background: #c82333;
  }

  .edit-btn {
    background: #ffc107;
    color: #333;
  }

  .edit-btn:hover {
    background: #e0a800;
  }
</style>