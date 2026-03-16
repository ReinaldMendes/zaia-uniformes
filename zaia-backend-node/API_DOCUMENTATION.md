# API Documentation

This document describes all available API endpoints for the **Zaia Uniformes** backend service. The base URL is assumed to be `http://localhost:5001/api` (adjust port as necessary).

---
## Authentication

### Register a new user
**URL:** `POST /auth/register`

**Body:**
```json
{
  "name": "Full Name",
  "email": "user@example.com",
  "password": "securepassword",
  "isAdmin": false   // optional, defaults to false
}
```

**Response:** 201 with created user or 400/500 on error.

---
### Login
**URL:** `POST /auth/login`

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:** 200 with JWT token and user info on success.

---
## User Management (Admin only)
All routes below require a valid JWT in the `Authorization: Bearer <token>` header and the user must be an admin.

### Create user
`POST /users`  
Body: same as registration payload but only admins can call.

### Get all users
`GET /users`  
Returns array of user objects.

### Get user by ID
`GET /users/:id`

### Update user by ID
`PUT /users/:id`  
Body may include `name`, `email`, `password`, `isAdmin`.

### Delete user by ID
`DELETE /users/:id`

---
## Partners

### List all partners (public)
`GET /partners`  
Returns publicly visible partner records.

### Create partner (Admin)
`POST /partners`  
Requires auth+admin. Multipart/form-data with fields:
- `name` (string)
- `logoFile` (file upload)

### Delete partner (Admin)
`DELETE /partners/:id`  
Requires auth+admin.

---
## Content

### List content items (public)
`GET /content`  
Returns all pieces of editable site content.

### Get content by key (public)
`GET /content/:key`

### Create content (Admin)
`POST /content`  
JSON body: `{ "key": "some-key", "value": "Some text or HTML" }`

### Update content (Admin)
`PUT /content/:key`  
JSON body with updated `value`.

### Delete content (Admin)
`DELETE /content/:key`

### Upload image for content (Admin)
`POST /content/upload/image`

Multipart/form-data with field `imageFile`. Response contains file URL (stored via multer).

---

## Common Practices

- **Authentication:** Send JWT token in `Authorization` header: `Bearer <token>`.
- **Content-Type:** Use `application/json` for JSON endpoints. When uploading files, use `multipart/form-data`.
- **Error handling:** API returns standard HTTP status codes with JSON error messages.

---

Feel free to copy this documentation into the README or share with frontend developers.
