import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurcharseEntry } from "./PurchaseEntry.entity";
import { SalesEntry } from "./SalesEntry.entity";
import { User } from "./User.entity";


export enum billType  {
    SALE="sale",
    PURCHASE="purchase"
}

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    bill_id : number

    @Column({nullable:true,type:"enum",enum:billType,default:billType.PURCHASE})
    billType:billType

    @OneToOne(()=>PurcharseEntry,(purchase_product)=>purchase_product.purchasedBill)
    @JoinColumn({name:"purchaseId"})
    purchased_product:PurcharseEntry

    @Column({nullable:true})
    purchaseId:number

    @OneToOne(()=>SalesEntry,(sale)=>sale.saledProduct)
    @JoinColumn({name:"saleId"})
    saled_product:SalesEntry

    @Column({nullable:true})
    saleId:number

    @ManyToOne(()=>User,(user)=>user.bills)
    @JoinColumn({name:"userId"})
    billedSatff:User

    

   @Column()
   userId:number

}