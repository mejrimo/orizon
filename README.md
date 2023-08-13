# Orizon

REST API of a touring group that allows you to create products, users and orders.

## Installation

1. Clone the repository: `git clone https://github.com/mejrimo/orizon.git`

2. Navigate to the directory: `cd <directory>`

3. Install the dependencies:

```bash
npm install
```

4. Rename '.env.example' to '.env' and insert your database connection string as DB_URL variable

5. Run the server:

```bash
npm start
```

6. Check the console to verify if you're connected or not.

## API Reference

#### USERS

- Get all users

```http
  GET /api/users
```

- Get one user using his ID as parameter

```http
  GET /api/users/:id
```

- Create a new user

```http
  POST /api/users
```

- Update an existing user passing his ID as parameter

```http
  PATCH /api/users/:id
```

- Delete an user passing his ID as parameter

```http
  DELETE /api/users/:id
```

#### PRODUCTS

- Get all products

```http
  GET /api/products
```

- Get one product using his ID as parameter

```http
  GET /api/products/:id
```

- Create a new product

```http
  POST /api/products
```

- Update an existing product passing his ID as parameter

```http
  PATCH /api/products/:id
```

- Delete a product passing his ID as parameter

```http
  DELETE /api/products/:id
```

#### ORDERS

- Get all orders

```http
  GET /api/orders
```

- Get one order using his ID as parameter

```http
  GET /api/orders/:id
```

- Create a new order

```http
  POST /api/orders
```

- Update an existing order passing his ID as parameter

```http
  PATCH /api/orders/:id
```

- Delete an order passing his ID as parameter

```http
  DELETE /api/orders/:id
```

#### QUERY FILTERS

| Parameter    | Type     | Description                          |
| :----------- | :------- | :----------------------------------- |
| `orderDate`  | `string` | Date to filter orders                |
| `productsId` | `string` | IDs of the products to filter orders |

```http
  GET /api/orders?orderDate=date
```

```http
  GET /api/orders?productsId=id1,id2
```

```http
  GET /api/orders?orderDate=date&productsId=id1,id2
```

## License

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
