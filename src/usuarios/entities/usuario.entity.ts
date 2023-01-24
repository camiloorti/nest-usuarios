import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {


    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true,
    })
    name: string;

    @Column('text',{
        unique: true,
    })
    ocupation: string;

    @Column('text',{
        unique: true
    })
    company: string;

    @Column('numeric')
    age: number;


    @Column('text',{
        unique: true
    })
    functions: string
        
    

}
