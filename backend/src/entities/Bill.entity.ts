import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PurcharseEntry } from "./PurchaseEntry.entity";
import { SalesEntry } from "./SalesEntry.entity";
import { User } from "./User.entity";

export enum billType  {
    SALE = "sale",
    PURCHASE = "purchase"
}

@Entity()
export class Bill {
    @PrimaryGeneratedColumn()
    bill_id: number;

    @Column({
        type: "enum",
        enum: billType,
        default: billType.PURCHASE,
    })
    billType: billType;

    @OneToOne(() => PurcharseEntry, (purchase) => purchase.purchasedBill)
    @JoinColumn({ name: "purchaseId" })
    purchased_product: PurcharseEntry;

    @Column({ nullable: true })
    purchaseId: number;

    @OneToOne(() => SalesEntry, (sale) => sale.saledBill)
    @JoinColumn({ name: "saleId" })
    saled_product: SalesEntry;

    @Column({ nullable: true })
    saleId: number;

    @ManyToOne(() => User, (user) => user.bills,{nullable:true})
    @JoinColumn({ name: "userId" })
    billedStaff: User;

    @Column({nullable:true})
    userId: number;
}
