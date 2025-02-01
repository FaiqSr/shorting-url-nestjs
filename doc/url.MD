# CREATE URL

Endpoint: POST /api/urls

Request Body:

```json
{
  "name": "name-url-with-slug",
  "url": "https://example.com"
}
```

Response Body Error:

```json
{
  "error": "this will be error message"
}
```

Response Body:

```json
{
  "username": "username",
  "url": "https://example.com",
  "name": "name-url-with-slug",
  "createdAt": "created date",
  "updatedAt": "updated date"
}
```

# GET URL

Endpoint : GET /api/urls

Query:

- page? : number
- size? : number

Headers:

- Authrozation : token

Response Body:

```json
{
  "data": [
    {
      "id": 120,
      "username": "faiqsr",
      "name": "name-url-with-slug",
      "url": "https://example.com",
      "createdAt": "2025-02-01T09:51:39.825Z",
      "updatedAt": "2025-02-01T09:51:39.825Z"
    },
    {
      "id": 121,
      "username": "faiqsr",
      "name": "izin-coba-short-url",
      "url": "https://faiqsr.vercel.app",
      "createdAt": "2025-02-01T09:52:35.715Z",
      "updatedAt": "2025-02-01T09:52:35.715Z"
    }
  ],
  "paging": {
    "current_page": "current page",
    "size": "size Pagination",
    "total_page": "total data on pagination"
  }
}
```

Response Body Error:

```json
{
  "errors": "error response"
}
```

# DELETE URL

Endpoint : DELETE /api/urls/:urlId

Param:

- urlId : number

Headers:

- Authorization : token

Response Body :

```json
{
  "data": true
}
```

Response Body error:

```json
{
  "errors": "Will be error message"
}
```

# UPDATE URL

Endpoint: PATCH /api/users

Headers:

- Authorization : token

Request Body:

```json
{
  "id": "url id",
  "name": "name updated url (optional)",
  "url": "url updated url (optional)"
}
```

Response Body:

```json
    {
      "id": 120,
      "username": "exampleusername]",
      "name": "name-url-with-slug",
      "url": "https://example.com",
      "createdAt": "2025-02-01T09:51:39.825Z",
      "updatedAt": "2025-02-01T09:51:39.825Z"
    },
```

Response Body error:

```json
{
  "errors": "Will be error message"
}
```
