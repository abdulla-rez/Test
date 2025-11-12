import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurcharseEntry } from "./PurchaseEntry.entity";
import { SalesEntry } from "./SalesEntry.entity";
import { User } from "./User.entity";

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    bill_id : number

    @OneToOne(()=>PurcharseEntry,(purchase_product)=>purchase_product.purchasedBill)
    purchased_product:PurcharseEntry

    @OneToOne(()=>SalesEntry,(sale)=>sale.saledProduct)
    saled_product:SalesEntry

   @ManyToOne(()=>User,(user)=>user.bills)
   @JoinColumn({name:"userId"})
   billedSatff:User

   @Column()
   userId:number

}