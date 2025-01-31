# CREATE USER

Endpoint : POST /api/users/

Request Body :

```json
{
  "username": "fill with username min 4 max 100",
  "password": "fill with password min 8 max 100",
  "name": "fill with name min 1 max 100"
}
```

Response Body :

```json
{
  "data": {
    "username": "username",
    "name": "name"
  }
}
```

Response Body (error)

```json
{
  "errors": "Username already exists"
}
```

# LOGIN USER

Endpoint : POST /api/users/login

Request body :

```json
{
  "username": "fill with username min 4 max 100",
  "password": "fill with password min 8 max 100"
}
```

Response Body :

```json
{
  "data": {
    "username": "username",
    "name": "name",
    "token": "token"
  }
}
```

Response Body (error) :

```json
{
  "errors": "username or password is invalid"
}
```

# GET USER

Endpoint : GET /api/users/current

Headers :

- Authorization: token

Response Body:

```json
{
  "data": {
    "username": "username",
    "password": "password",
    "token": "token"
  }
}
```

Response Body (error):

```json
{
  "errors": "Unauthorized"
}
```

# PATCH USER

Endpoint : PATCH /api/users/current

Headers :

- Authorization: token

Request Body :

```json
{
  "username": "username",
  "password": "password",
  "name": "name"
}
```
