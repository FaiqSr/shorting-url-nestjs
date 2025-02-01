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
  "errors": "This will be error message"
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
  "errors": "This will be error message"
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
    "name": "name",
    "token": "token"
  }
}
```

Response Body (error):

```json
{
  "errors": "This will be error message"
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

Response Body :

```json
{}
```

Response Body (error):

```json
{
  "errors": "This will be error message"
}
```

# DELETE USER

Endpoint : DELETE /api/users/logout

Headers :

- Authorization: token

Response Body:

```json
{
  "data": true
}
```

Response Body (error):

```json
{
  "errors": "This will be error message"
}
```
