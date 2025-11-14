import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SalesEntry } from "./SalesEntry.entity";
import { Product } from "./Product.entity";

@Entity()
export class SaleItem {

    @PrimaryGeneratedColumn()
    saleItemId: number;

    @Column()
    quantity: number;

    @Column()
    subTotal: number;

    @ManyToOne(() => SalesEntry, (sale) => sale.saleItem)
    sale: SalesEntry;

    @ManyToOne(() => Product, (product) => product.saleItems)
    @JoinColumn({name:"productId"})
    product: Product;
}
