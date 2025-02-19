# Documentação da API

## Observações
- É necessário passar o token na header da requisição

## Registro de cliente
```http
POST /user/register
```
| Parâmetro | Tipo     | Descrição                                                   |
|:----------|:---------|:------------------------------------------------------------|
| `usuario` | `object` | **Obrigatório**. Json que contém as informações do usuário. |

### Exemplo de request:
```json
{
    "usuario": {
        "email": "user@gmail.com",
        "senha": "123",
        "cpf": "999999999-00",
        "role": "USER",
        "username": "user",
        "nome": "user",
        "telefone": "99999999999",
        "dadosDeEntrega": {
            "cep": "99999-00",
            "endereco": "Rua rua rua rua",
            "numero": "999",
            "cidade": "Belo Horizonte ",
            "estado": "Minas Gerais",
            "complemento": ""
        }
    }
}
```
ou com os dados de entrega nulos:
```json
{
    "usuario": {
        "email": "user@gmail.com",
        "senha": "123",
        "cpf": "999999999-00",
        "role": "USER",
        "username": "user",
        "nome": "user",
        "telefone": "99999999999"
    }
}
```
### Exemplo de retorno:
```json
{
    "token": "...",
    "role": "USER"
}
```
### Exemplo de retorno sem sucesso:
```json
{
    "message": "Email já cadastrado",
    "status": 409
}
```

## Login de usuário
```http
POST /user/login
```
| Parâmetro | Tipo     | Descrição                            |
|:----------|:---------|:-------------------------------------|
| `email`   | `string` | **Obrigatório**. O email do usuário. |
| `senha`   | `string` | **Obrigatório**. A senha do usuário. |

### Exemplo de request:
```json
{
    "email": "letcia2003@gmail.com",
    "senha": "1234"
}
```
### Retorno
- **Sucesso**: Retorna um token.
- **Erro 401**: 
  - Caso o email informado não seja encontrado, retorna a mensagem: ***"Nenhum usuário encontrado com o email fornecido. Verifique se o email está correto."***
  - Caso o email esteja correto e a senha incorreta, retorna a mensagem: ***"A senha fornecida está incorreta."***

### Exemplo de retorno:
```json
{
    "token": "...",
    "role": "USER"
}
```
### Exemplo de retorno sem sucesso:
```json
{
    "message": "A senha fornecida está incorreta",
    "status": 409
}
```
## Atualização das informações de um usuário
```http
PATCH /user/update
```
| Parâmetro | Tipo     | Descrição                                   |
|:----------|:---------|:--------------------------------------------|
| `nome`    | `string` | **Opcional**. O nome atualizado do usuário. |
| `username`    | `string`   | **Opcional**. Username atualizado do usuário. 
| `email`    | `string`   | **Opcional**. O email atualizado do usuário.
| `telefone`    | `string`   | **Opcional**. O telefone atualizado do usuário.  |
| `senha`    | `string`   | **Opcional**. A senha atualizada do usuário. | 
| `dadosDeEntrega`    | `objeto`   | **Opcional**. Os dados de entrega atualizados do usuário. | 

- Todos os parâmetros são ```@Nullable```, não é necessário enviar todos os dados do usuário, apenas aqueles que foram atualizados.
- Não é possível alterar o CPF e a ROLE. 

### Exemplo de request: 
````json
{
    "nome": "nome trocado 123",
    "email": "emailtrocado@123",
    "dadosDeEntrega": {
        "cep": "31610250",
        "cidade": "cidade atualizada"
    }
}
````

### Exemplo de retorno:
````json
{
    "token": "...",
    "role": "ROLE_USER"
}
````

### Exemplo de retorno em caso de erro:
````json
{
    "message": "Algo deu errado ao atualizar o usuário",
    "status": "400"
}
````


## Busca de informações de um Usuário Específico
```http
GET /user/get-user
```
| Parâmetro       | Tipo     | Descrição                                          |
|:----------------|:---------|:---------------------------------------------------|
| `Authorization` | `string` | **Obrigatório**. O token de autorização na header. |

### Exemplo de retorno:
```json
{
    "id": 1352,
    "role": "USER",
    "username": "leticia amaral figueiredo",
    "cpf": "...",
    "email": "letc@gmai.om",
    "telefone": "...",
    "senha": "...",
    "produtos": [],
    "dadosDeEntrega": {
        "id": 1102,
        "cep": "999999",
        "cidade": "Belo Horizonte ",
        "estado": "Minas Gerais",
        "endereco": "...",
        "numero": "...",
        "complemento": ""
    },
    "enabled": true,
    "accountNonLocked": true,
    "password": "...",
    "credentialsNonExpired": true,
    "accountNonExpired": true,
    "authorities": [
        {
            "authority": "USER"
        }
    ]
}
```

## Busca nos Dados de Entrega
```http
GET /dados-de-entrega/get
```
| Parâmetro       | Tipo     | Descrição                                          |
|:----------------|:---------|:---------------------------------------------------|
| `Authorization` | `string` | **Obrigatório**. O token de autorização na header. |

### Retorno
- Dados de entrega de um usuário.

### Exemplo de retorno:
```json
{
    "id": 402,
    "cep": "131313",
    "cidade": "cidade",
    "estado": "estado",
    "endereco": "teste",
    "numero": "244",
    "complemento": "lalla"
}
```

## Atualização nos Dados de Entrega
```http
PATCH /dados-de-entrega/update
```
| Parâmetro       | Tipo     | Descrição                                          |
|:----------------|:---------|:---------------------------------------------------|
| `Authorization` | `string` | **Obrigatório**. O token de autorização na header. |
| `cep`           | `string` | **Obrigatório**. O CEP.                            |
| `cidade`        | `string` | **Obrigatório**. A cidade.                         |
| `estado`        | `string` | **Obrigatório**. O estado.                         |
| `endereco`      | `string` | **Obrigatório**. O endereço.                       |
| `numero`        | `string` | **Obrigatório**. O número.                         |
| `complemento`   | `string` | **Opcional**. O complemento.                       |

### Exemplo de request:
```json
{
    "id": 402,
    "cep": "131313",
    "cidade": "cidade",
    "estado": "estado",
    "endereco": "teste",
    "numero": "244",
    "complemento": "lalla" 
}
```
### Retorno
- Dados de entrega atualizados.

### Exemplo de retorno (tem o mesmo body da request):
```json
{
    "id": 402,
    "cep": "131313",
    "cidade": "cidade",
    "estado": "estado",
    "endereco": "teste",
    "numero": "244",
    "complemento": "lalla"
}
```
---

# Produto

## Atualizar destaque

````http
PATCH /produto/atualizar/{produtoId}
````
| Parâmetro       | Tipo     | Descrição                                             |
|:----------------|:---------|:------------------------------------------------------|
| `Authorization` | `string` | **Obrigatório**. O token de autorização no cabeçalho. |
- Exemplo de body
````json
true
````
- Exemplo em Axios:
````javascript
const isDestaque = true; // ou false

axios.patch(`http://localhost:8080/atualizar/${produtoId}`, isDestaque, {
  headers: {
    'Content-Type': 'application/json',
    'Authorization': '...'
  },
})
````

- Exemplo de retorno:
```json
{     
    "produtoId": 1102,
    "preco": 1200,
    "descricao": "Smartphone de última geração com tela AMOLED e 128GB de armazenamento.",
    "nome": "Smartphone XYZ",
    "quantidade": 10,
    "categoriasIds": null,
    "images": [],
    "categorias": [],
    "destaque": true
}
```
## Get nos produtos em destaque
```http
GET /produto/destaques
```
| Parâmetro       | Tipo     | Descrição                                             |
|:----------------|:---------|:------------------------------------------------------|
| `Authorization` | `string` | **Obrigatório**. O token de autorização no cabeçalho. |
---

- Exemplo de retorno:
````json
[
    {
        "produtoId": 1102,
        "preco": 1200,
        "descricao": "Smartphone de última geração com tela AMOLED e 128GB de armazenamento.",
        "nome": "Smartphone XYZ",
        "quantidade": 10,
        "categoriasIds": null,
        "images": [],
        "categorias": [],
        "destaque": true
    },
    {
        "produtoId": 1152,
        "preco": 100,
        "descricao": " e 128GB de armazenamento.",
        "nome": " XYZ",
        "quantidade": 15,
        "categoriasIds": null,
        "images": [],
        "categorias": [],
        "destaque": true
    }
]
````

# Carrinho

## Get Carrinho
```http
GET /user/carrinho/get
```
| Parâmetro       | Tipo     | Descrição                                             |
|:----------------|:---------|:------------------------------------------------------|
| `id`            | `long`   | **Obrigatório**. O ID do carrinho.                    |
| `Authorization` | `string` | **Obrigatório**. O token de autorização no cabeçalho. |

### Exemplo de retorno:
```json
{
    "carrinhoId": 2152,
    "precoTotal": 200.00,
    "produtos": [
        {
            "produtoId": 702,
            "nome": "nome",
            "descricao": "desc",
            "preco": 1,
            "imagens": [
                {
                    "id": 1,
                    "image": "...",
                    "mimeType": "image/webp"
                }
            ],
            "quantidadeNoCarrinho": 200
        }, ...
    ]
}
```
#### Códigos de retorno:
- **200 OK**: Quando o carrinho é encontrado.
- **404 Not Found**: Se o carrinho não for encontrado.
- **401 Unauthorized**: Se o token de autorização for inválido ou ausente.
---

## Cadastrar Produto no Carrinho de compras
```http
POST /carrinho/cadastrar/{produtoId}
```
| Parâmetro       | Tipo      | Descrição                                             |
|:----------------|:----------|:------------------------------------------------------|
| `produtoId`     | `long`    | **Obrigatório**. O ID do produto.                     |
| `quantidade`    | `integer` | **Obrigatório**. A quantidade do produto.             |
| `Authorization` | `string`  | **Obrigatório**. O token de autorização no cabeçalho. |

### Exemplo de request:
```json
{
    "quantidade": 2
}
```

### Retorno
- **Sucesso**: Retorna o carrinho atualizado.
- **Erro 400**: Caso ocorra um erro ao cadastrar o produto, retorna uma mensagem de erro.

### Exemplo de retorno sem sucesso:
```json
{
    "message": "Algo deu errado ao cadastrar produto",
    "status": 400
}
```
---
## Remover um produto do carrinho
```http
PATCH /carrinho/{produtoId}/remover
```
| Parâmetro       | Tipo     | Descrição                                             |
|:----------------|:---------|:------------------------------------------------------|
| `produtoId`     | `long`   | **Obrigatório**. O ID do produto.                     |
| `Authorization` | `string` | **Obrigatório**. O token de autorização no cabeçalho. |

### Exemplo de retorno:
```json
{
    "carrinhoId": 2152,
    "precoTotal": 0,
    "produtos": []
}
```
#### Códigos de retorno:
- **200 OK**: Quando o carrinho é encontrado.
- **404 Not Found**: Se o carrinho não for encontrado.
- **401 Unauthorized**: Se o token de autorização for inválido ou ausente.
---

## Atualizar Produto no Carrinho de compras
```http
PATCH /carrinho/{produtoId}/atualizar
```
| Parâmetro       | Tipo      | Descrição                                             |
|:----------------|:----------|:------------------------------------------------------|
| `produtoId`     | `long`    | **Obrigatório**. O ID do produto.                     |
| `quantidade`    | `integer` | **Obrigatório**. A nova quantidade do produto.        |
| `Authorization` | `string`  | **Obrigatório**. O token de autorização no cabeçalho. |

### Exemplo de request:
```json
{
    "quantidade": 3
}
```

### Retorno
- **Sucesso**: Retorna o carrinho atualizado.
- **Erro 400**: Caso ocorra um erro ao atualizar o produto, retorna uma mensagem de erro.

### Exemplo de retorno sem sucesso:
```json
{
    "message": "Algo deu errado ao atualizar produto",
    "status": 500
}
```
# Pagamento 
````http
POST /pagamento/v1/checkoutpro
````
- **Body**
- O body da request é vazio, o carrinho é retirado do usuário que fez a request. Se o usuario tenta fazer uma compra com carrinho vazio, a api retorna````403````
- A única informação que o front precisa enviar é o próprio token do usuário que está fazendo a compra

- **Retorno** na criação de uma preferencia (quando o usuário clica em comprar): 
````json
{
    "response": {
        "statusCode": 201,
        "headers": {
            "vary": [
                "Accept-Encoding"
            ],
            "X-Request-Id": [
                "b978e896-6065-40e2-8704-de7f276c3773"
            ],
            "Access-Control-Allow-Origin": [
                "*"
            ],
            "X-Content-Type-Options": [
                "nosniff"
            ],
            "Access-Control-Allow-Methods": [
                "PUT, GET, POST, DELETE, OPTIONS"
            ],
            "Connection": [
                "keep-alive"
            ],
            "Date": [
                "Sun, 17 Nov 2024 23:18:50 GMT"
            ],
            "Access-Control-Allow-Headers": [
                "Content-Type"
            ],
            "Strict-Transport-Security": [
                "max-age=16070400; includeSubDomains; preload"
            ],
            "Timing-Allow-Origin": [
                "*"
            ],
            "X-XSS-Protection": [
                "1; mode=block"
            ],
            "Access-Control-Max-Age": [
                "86400"
            ],
            "Content-Type": [
                "application/json; charset=utf-8"
            ]
        },
        "content": "{\"additional_info\":\"\",\"auto_return\":\"all\",\"back_urls\":{\"failure\":\"https://test.com/failure\",\"pending\":\"https://test.com/pending\",\"success\":\"https://test.com/success\"},\"binary_mode\":false,\"client_id\":\"4181233950456174\",\"collector_id\":685366721,\"coupon_code\":null,\"coupon_labels\":null,\"date_created\":\"2024-11-17T19:18:50.603-04:00\",\"date_of_expiration\":null,\"differential_pricing\":{\"id\":null},\"expiration_date_from\":null,\"expiration_date_to\":null,\"expires\":false,\"external_reference\":\"\",\"id\":\"685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e\",\"init_point\":\"https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e\",\"internal_metadata\":null,\"items\":[{\"id\":\"1053\",\"category_id\":\"\",\"currency_id\":\"BRL\",\"description\":\"\",\"title\":\"fesf\",\"quantity\":1,\"unit_price\":3}],\"marketplace\":\"NONE\",\"marketplace_fee\":0,\"metadata\":{},\"notification_url\":\"https://notificationurl.com\",\"operation_type\":\"regular_payment\",\"payer\":{\"phone\":{\"area_code\":\"55\",\"number\":\"99999999999\"},\"address\":{\"zip_code\":\"99999-00\",\"street_name\":\"Rua rua rua rua\",\"street_number\":\"999\"},\"email\":\"test_user_504659780@testuser.com\",\"identification\":{\"number\":\"$2a$10$n3ZaXADfMPfQ4UCVsrZnpOe.eNZJaXF7YVacvCjNDGEgi9pFZUIg2\",\"type\":\"CPF\"},\"name\":\"user\",\"surname\":\"\",\"date_created\":null,\"last_purchase\":null},\"payment_methods\":{\"default_card_id\":null,\"default_payment_method_id\":null,\"excluded_payment_methods\":[{\"id\":\"\"}],\"excluded_payment_types\":[{\"id\":\"\"}],\"installments\":10,\"default_installments\":1},\"processing_modes\":null,\"product_id\":null,\"redirect_urls\":{\"failure\":\"\",\"pending\":\"\",\"success\":\"\"},\"sandbox_init_point\":\"https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e\",\"site_id\":\"MLB\",\"shipments\":{\"default_shipping_method\":null,\"receiver_address\":{\"zip_code\":\"\",\"street_name\":\"\",\"street_number\":null,\"floor\":\"\",\"apartment\":\"\",\"city_name\":null,\"state_name\":null,\"country_name\":null}},\"statement_descriptor\":\"Casa e Condominio BH\",\"total_amount\":null,\"last_updated\":null,\"financing_group\":\"\"}"
    },
    "id": "685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e", -> Id da preferencia
    "items": [
        {
            "id": "1053",
            "title": "fesf",
            "description": "",
            "pictureUrl": null,
            "categoryId": "",
            "quantity": 1,
            "unitPrice": 3,
            "currencyId": "BRL",
            "categoryDescriptor": null
        }
    ],
    "payer": { Dados do pagador
        "name": "user",
        "surname": "",
        "email": "test_user_504659780@testuser.com",
        "phone": {
            "areaCode": "55",
            "number": "99999999999"
        },
        "identification": {
            "type": "CPF",
            "number": "999999999-00"
        },
        "address": {
            "zipCode": "99999-00",
            "streetName": "Rua rua rua rua",
            "streetNumber": "999"
        },
        "dateCreated": null,
        "lastPurchase": null
    },
    "clientId": "4181233950456174",
    "paymentMethods": {
        "excludedPaymentMethods": [
            {
                "id": ""
            }
        ],
        "excludedPaymentTypes": [
            {
                "id": ""
            }
        ],
        "defaultPaymentMethodId": null,
        "installments": 10, 
        "defaultInstallments": 1
    },
    "backUrls": { -> Urls de redirecionamento, de acordo com o resultado de pagamento
        "success": "https://test.com/success",
        "pending": "https://test.com/pending",
        "failure": "https://test.com/failure"
    },
    "shipments": { -> Dados de envio, todos nulos
        "mode": null,
        "localPickup": null,
        "dimensions": null,
        "defaultShippingMethod": null,
        "freeMethods": null,
        "cost": null,
        "freeShipping": null,
        "receiverAddress": {
            "zipCode": "",
            "streetName": "",
            "streetNumber": null,
            "countryName": null,
            "stateName": null,
            "floor": "",
            "apartment": "",
            "cityName": null
        },
        "expressShipment": null
    },
    "notificationUrl": "https://notificationurl.com", -> Url de notificação, descrita nas informações adicionais abaixo
    "statementDescriptor": "Casa e Condominio BH",
    "externalReference": "",
    "expires": false,
    "dateOfExpiration": null,
    "expirationDateFrom": null,
    "expirationDateTo": null,
    "collectorId": 685366721,
    "marketplace": "NONE",
    "marketplaceFee": 0,
    "additionalInfo": "",
    "autoReturn": "all",
    "operationType": "regular_payment",
    "differentialPricing": {
        "id": null
    },
    "processingModes": null,
    "binaryMode": false,
    "taxes": null,
    "tracks": null,
    "metadata": {},
    "initPoint": "https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e",
    "sandboxInitPoint": "https://sandbox.mercadopago.com.br/checkout/v1/redirect?pref_id=685366721-289266b3-4f05-47ec-87d6-d5a8c8213e5e", -> Url de teste para pagamento
    "dateCreated": "2024-11-17T19:18:50.603-04:00"
}
````
---
# Compra

## Get compras

````http
GET /user/get/compras
````

| Parâmetro       | Tipo      | Descrição                                             |
|:----------------|:----------|:------------------------------------------------------|

| `Authorization` | `string`  | **Obrigatório**. O token de autorização no cabeçalho. |

- Exemplo de retorno
````json
[
    {
        "user": {
            ...
        },
        "valor": 150.00,
        "produtos": [
            {
            "produtoId": 101,
            "preco": 50.00,
            "descricao": "Camiseta básica",
            "nome": "Camiseta",
            "quantidade": 2,
            "isDestaque": false
            },
            {
            "produtoId": 102,
            "preco": 100.00,
            "descricao": "Calça jeans",
            "nome": "Calça",
            "quantidade": 1,
            "isDestaque": true
            }
        ],
        "avaliacao": {
            "nota": 5,
            "comentario": "Ótima experiência de compra."
        }
    },
    {
        ...
    }
]

````
---
### Informações adicionais sobre o pagamento
- O link que redireciona o usuário para pagamento é o **initPoint**, presente no json de retorno demonstrado acima, o usuário deve ser redirecionado para esta url após clicar em comprar.
- Primeiro, quando o usuário clica em comprar, a preferencia é criada com os itens, dados do pagador e preço, com as backUrls (urls de redirecionamento **após** o pagamento, que podem ser da home, listagem de produtos, etc...). Na tela que ele é redirecionado, como descrito acima, é onde ele seleciona método de pagamento, parcelas, etc.
- Após o pagamento, é possível criar um webhook de notificações para saber se o pagamento foi aprovado ou não para notificar uma adminitrador, o envio pode ser por email, por exemplo