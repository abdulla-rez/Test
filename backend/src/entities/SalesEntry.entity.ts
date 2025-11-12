import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Bill } from "./Bill.entity";

@Entity()
export class SalesEntry{
    @PrimaryGeneratedColumn()
    sales_id : number

    @Column()
    quantity:number

    @Column()
    total_price:number

    @CreateDateColumn()
    sale_date:Date

    @ManyToOne(()=>Product,(product)=>product.saled)
    @JoinColumn({name:"productId"})
    saledProduct:Product

    @Column()
    tax:number

    @Column()
    productId:number

    @OneToOne(()=>Bill,(bill)=>bill.saled_product)
    saledBill : Bill
}