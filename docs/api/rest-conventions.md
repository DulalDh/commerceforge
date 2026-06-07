# REST API Conventions

Base path: `/api/v1`

Planned modules:

- `/auth`
- `/users`
- `/products`
- `/orders`
- `/payments`
- `/ai`

Response bodies should use a consistent shape:

```json
{
  "success": true,
  "data": {},
  "message": "Optional human-readable message"
}
```

Error responses should use:

```json
{
  "success": false,
  "message": "Error message"
}
```

