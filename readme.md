# create db

```
npx wrangler d1 create mydb
```

# attach env wrangler.jsonc

```
"d1_databases": [
		{
			"binding": "my_api_db",
			"database_name": "my_api_db",
			"database_id": "e6605dc3-f94a-4fb4-8587-fb2b4f574270"
		}
	],
```

# can be accessed

```
c.env.DB
```

# migrations

```
migrations/0001_init.sql
```

# deploy migration

```
npx wrangler d1 migrations apply mydb --local
npx wrangler d1 migrations apply mydb --remote
```

# manual

```
npx wrangler d1 execute mydb --local --command="CREATE TABLE test(id INTEGER PRIMARY KEY,name TEXT)"
```

# access

```
import { Hono } from 'hono'

const app = new Hono()

app.get('/users', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT * FROM users'
  ).all()

  return c.json(results)
})

export default app
```

# Insert

```
app.post('/users', async (c) => {

    const body = await c.req.json()

    const result = await c.env.DB
        .prepare(`
            INSERT INTO users(name,email,age)
            VALUES(?1, ?2, ?3)
        `)
        .bind(
            body.name,
            body.email,
            body.age
        )
        .run()

    return c.json(result)
})
```

# update

```
app.put('/users/:id', async (c) => {

    const id = c.req.param('id')
    const body = await c.req.json()

    const result = await c.env.DB
        .prepare(`
            UPDATE users
            SET name=?, email=?, age=?
            WHERE id=?
        `)
        .bind(
            body.name,
            body.email,
            body.age,
            id
        )
        .run()

    return c.json(result)
})
```

# Delete

```
app.delete('/users/:id', async (c) => {

    const id = c.req.param('id')

    const result = await c.env.DB
        .prepare('DELETE FROM users WHERE id=?')
        .bind(id)
        .run()

    return c.json(result)
})
```

# query builder

```
app.get('/users/:id', async (c) => {

    const id = c.req.param('id')

    const { results } = await c.env.DB
        .prepare('SELECT * FROM users WHERE id=?')
        .bind(id)
        .all()

    return c.json(results)
})
```
