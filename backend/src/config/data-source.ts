import { DataSource } from "typeorm";
import dotenv from "dotenv";
dotenv.config();

import { User } from "../entities/User.entity";
import { Bill } from "../entities/Bill.entity";
import { Product } from "../entities/Product.entity";
import { SalesEntry } from "../entities/SalesEntry.entity";
import { PurcharseEntry } from "../entities/PurchaseEntry.entity";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,

    entities: [User,Bill,Product,SalesEntry,PurcharseEntry],
});
