import { Entity, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Transactions } from "./Transaction";
import { Person } from "./utils/Person";

@Entity('client')
export class Client extends Person {

    @Column({
        type: "numeric"
    })
    balance: number

    @Column({
        default: true
    })
    is_active: boolean

    @Column({
        type: "simple-json",
        nullable: true
    })
    additional_info: {
        age: number;
        hair_color: string;
    }

    @Column({
        type: 'simple-array',
        default: []
    })
    family_member: string[]

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_At: Date;

    @OneToMany(() => Transactions, transactions => transactions.client)
    transactions: Transactions
}