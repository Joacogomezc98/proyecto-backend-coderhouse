import { buildSchema } from "graphql";

// GRAPHQL SCHEMAS
const productGraphqlSchema = buildSchema(`
    type Product {
        id: String
        title: String,
        price: Int,
        stock: Int,
        thumbnail: String,
        timestamp: String
    }
    input ProductInput {
        title: String,
        price: Int,
        stock: Int,
        thumbnail: String,
        timestamp: String
    }
    type Query {
        getProduct(id: ID!): Product,
        getProducts: [Product],
    }
    type Mutation {
        createProduct(datos: ProductInput): Product,
        updateProduct(id: ID!, datos: ProductInput): Product,
        deleteProduct(id: ID!): Product
    }
`)

export {productGraphqlSchema}