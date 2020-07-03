# REST API com Node, JWT(Json Web Token), Express, Mongo

## Requirements
* Node, NPM, Mongoose 

## Installation
* Clone this repo: ``` git clone https://github.com/FernandoFBueno/node-rest-jwt.git ```
* Install dependecies: ``` npm install ```
* Install packges: ``` bcrypt body-parser config consign cors express jsonwebtoken mongoose mongoose-validator morgan ```
* Install nodemon: ``` npm install nodemon -g ```
* Run: ``` npm start ```

## Test
* Run: ``` npm run test```

## Criar Usuario
* Post 
```js
curl --location --request POST 'http://localhost:8080/api/v1/user' \ 
            --header 'Content-Type: application/json' \
            --data-raw '{
                "Nome": "Fernando Bueno",
                "CPF": "12312312321",
                "Email": "fernando@fernando.com",
                "Senha": "123456",
                "Super": true
            }'  
```

## Autenticar Usuario
* Post 
```js
curl --location --request POST 'http://localhost:8080/api/v1/authenticate' \
--header 'Content-Type: application/json' \
--data-raw '{
    "CPF": "12312312321",
    "Senha": "123456"
}'
```
* Retorno Token, guardar o token
```js
{
    "status": "success",
    "message": "user found!!!",
    "data": {
        "user": {
            "Super": true,
            "_id": "5eff94cc25d2065d9404cceb",
            "Nome": "Fernando Bueno 2",
            "CPF": "12312312321",
            "Email": "fernando2@fernando.com",
            "Senha": "$2b$10$jI59.vAx49QAxNMZbHOPJ.nuygxUsmT7VsOgU5rJYomKTQ9u07sh6",
            "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgwODEwMywiZXhwIjoxNTkzODExNzAzfQ.Z_QeCX0UxI9hvL2P-cUL8mCXMk5y5pfvXu889CCvca4"
    }
}
```

## Listar Revendedores
* Get com Token 
```js
curl --location --request GET 'http://localhost:8080/api/v1/revendedores' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s'
```

## Criar Faixas de Cash Back
* Post com Token 
```js
curl --location --request POST 'http://localhost:8080/api/v1/faixascashback' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Descricao": "Compras acima de R$ 1500",
    "Porcentagem": 20,
    "FaixaTop": 10000,
    "FaixaIni": 1500.01
}'
```

```js
curl --location --request POST 'http://localhost:8080/api/v1/faixascashback' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Descricao": "Compras até R$ 1500",
    "Porcentagem": 15,
    "FaixaTop": 1500,
    "FaixaIni": 1000.01
}'
```

```js
curl --location --request POST 'http://localhost:8080/api/v1/faixascashback' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Descricao": "Compras até R$ 1000",
    "Porcentagem": 10,
    "FaixaTop": 1000,
    "FaixaIni": 0
}'
```

## Criar Compra
* Post com Token 
```js
curl --location --request POST 'http://localhost:8080/api/v1/compra' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--header 'Content-Type: application/json' \
--data-raw '{
    "Revendedor": "5efd31c8e44149beb973dc36",
    "ValorCompra": 500.56
}'
```

## Listar todas as compras
* Get com Token 
```js
curl --location --request GET 'http://localhost:8080/api/v1/compras' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--data-raw ''
```

## Listar todas as compras por revendedor
* Get com Token passando o id do revendedor
```js
curl --location --request GET 'http://localhost:8080/api/v1/compras/5efd31c8e44149beb973dc36' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--data-raw ''
```

## Listar detalhe da compra
* Get com Token passando o id da compra
```js
curl --location --request GET 'http://localhost:8080/api/v1/compra/5efd3b21aa104101be0b06dd' \
--header 'x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZmY5NGNjMjVkMjA2NWQ5NDA0Y2NlYiIsImlhdCI6MTU5MzgxODEyNywiZXhwIjoxNTkzODIxNzI3fQ.1K8higWtsuIzVCI5iJJeGJejkQtm5HMsCo-X81qgZ7s' \
--data-raw ''
```


