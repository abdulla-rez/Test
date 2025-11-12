import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product.entity";
import { Bill } from "./Bill.entity";

@Entity()
export class PurcharseEntry{
    @PrimaryGeneratedColumn()
    purchase_id : number

    @Column()
    quantity:number

    @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
    total_price:number

    @CreateDateColumn()
    purchase_date:Date

    @ManyToOne(()=>Product,(product)=>product.purchased)
    @JoinColumn({name:"productId"})
    purchasedProduct:Product

    @Column()
    productId:number

 
    @OneToOne(()=>Bill,(bill)=>bill.purchased_product)
    purchasedBill : Bill

    
}