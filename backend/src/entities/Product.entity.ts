import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PurcharseEntry } from "./PurchaseEntry.entity";
import { SaleItem } from "./SaleItem.entity";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    product_id: number;

    @Column()
    product_name: string;

    @Column()
    SKU: string;

    @Column()
    price: number;

    @Column()
    currentStock: number;

    @Column({ nullable: true })
    image: string;

    @Column()
    taxPercentage: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => PurcharseEntry, (purchase) => purchase.purchasedProduct)
    purchased: PurcharseEntry[];

    @OneToMany(() => SaleItem, (saleItem) => saleItem.product)
    saleItems: SaleItem[];
}
