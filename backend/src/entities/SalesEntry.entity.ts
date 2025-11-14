import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Bill } from "./Bill.entity";
import { SaleItem } from "./SaleItem.entity";

@Entity()
export class SalesEntry {
  @PrimaryGeneratedColumn()
  sales_id: number;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  final_price: number;

  @CreateDateColumn()
  sale_date: Date;

  @OneToMany(() => SaleItem, (saleItem) => saleItem.sale,{onDelete:"CASCADE"})
  saleItem: SaleItem[];

  @OneToOne(() => Bill, (bill) => bill.saled_product)
  saledBill: Bill;
}
