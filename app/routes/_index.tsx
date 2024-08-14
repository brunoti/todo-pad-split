import { createId } from '@paralleldrive/cuid2'
import {
  ActionFunctionArgs,
  json,
  TypedResponse,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from '@remix-run/react'
import { useRef, useEffect } from 'react'
import { Card } from '~/components/Card'
import { Input } from '~/components/Input'
import * as data from '~/server/data'

export const meta: MetaFunction = () => {
  return [{ title: 'Pad Split Todo' }]
}

export async function action({ request }: ActionFunctionArgs): Promise<
  TypedResponse<{
    message?: string
    error?: string
  }>
> {
  const formData = await request.formData()
  const intent = formData.get('intent')
  if (intent === 'add') {
    const title = formData.get('title')
    if (!title) {
      return json(
        { error: 'Title is required', message: 'Was not able to add todo' },
        { status: 400 },
      )
    }
    await data.add({
      id: createId(),
      title: title as string,
      isDone: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    return json({ message: 'Todo added', error: undefined })
  }

  if (intent === 'delete') {
    const id = formData.get('id')
    if (!id) {
      return json(
        { error: 'ID is required', message: 'Was not able to delete todo' },
        { status: 400 },
      )
    }
    await data.remove(id as string)
    return json({ message: 'Todo deleted', error: undefined })
  }

  return json(
    { error: 'Invalid intent', message: 'Was not able to add todo' },
    { status: 400 },
  )
}

export async function loader(_: LoaderFunctionArgs) {
  return json({ todos: await data.all() })
}

export default function Index() {
  const { todos } = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const navigation = useNavigation()
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(
    function resetFormOnSuccess() {
      if (navigation.state === 'idle' && !actionData?.error) {
        formRef.current?.reset()
      }
    },
    [navigation.state, actionData],
  )

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[500px]">
        <Card.Header>
          <Card.Title>PadSplit Todo App</Card.Title>
        </Card.Header>

        <Form action="/?index" className="p-2" method="POST" ref={formRef}>
          <div className="grid grid-cols-10">
            <div className="col-span-9">
              <Input
                placeholder="Do the dishes today"
                label="Add todo"
                name="title"
                error={actionData?.error ?? ''}
              />
            </div>
            <div className="col-span-1 flex items-end">
              <button
                className="text-blue-500 font-bold text-3xl p-2"
                type="submit"
                name="intent"
                value="add"
              >
                +
              </button>
            </div>
          </div>
        </Form>

        <div className="w-full h-[500px] overflow-auto">
          {todos.map(todo => (
            <div className="w-full grid grid-cols-10 border-b min-h-[50px] px-4">
              <div className="col-span-8 flex items-center">
                <input
                  type="checkbox"
                  checked={todo.isDone}
                  className="mr-4 size-4"
                />
                {todo.title}
              </div>
              <div className="col-span-2 flex items-center justify-end text-xs">
                <Form action="/?index" method="POST">
                  <input type="hidden" name="id" value={todo.id} />
                  <button className="text-red-500" name="intent" value="delete">
                    Delete
                  </button>
                </Form>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
