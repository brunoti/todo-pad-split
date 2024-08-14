import fs from 'node:fs/promises'
import path from 'node:path'

export type Todo = {
  id: string
  title: string
  isDone: boolean
  createdAt: string
  updatedAt: string
}

export async function all(): Promise<Todo[]> {
  const jsonPath = path.join(import.meta.dirname, './data.json')
  const data = await fs.readFile(jsonPath, 'utf-8')
  return JSON.parse(data)
}

export async function write(data: Todo[]): Promise<void> {
  const jsonPath = path.join(import.meta.dirname, './data.json')
  const json = JSON.stringify(data, null, 2)
  await fs.writeFile(jsonPath, json, 'utf-8')
}

export async function add(data: Todo): Promise<void> {
  const todos = await all()
  todos.push(data)
  await write(todos)
}

export async function update(data: Todo): Promise<void> {
  const todos = await all()
  const index = todos.findIndex(todo => todo.id === data.id)
  todos[index] = data
  await write(todos)
}

export async function remove(id: string): Promise<void> {
  const todos = await all()
  const index = todos.findIndex(todo => todo.id === id)
  todos.splice(index, 1)
  await write(todos)
}
