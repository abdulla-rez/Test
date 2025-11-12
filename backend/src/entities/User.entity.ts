import { Exclude } from "class-transformer";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Bill } from "./Bill.entity";


 export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff',

}

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    user_id: string
    
    @Column()
    name: string

    @Column({unique: true})
    email: string

    @Column({type:"enum", enum:UserRole,default:UserRole.STAFF,nullable:true},)
    role:UserRole

    @Exclude()
    @Column()
    password: string

   @OneToMany(()=>Bill,(bill)=>bill.billedSatff)
   bills:Bill[]


}