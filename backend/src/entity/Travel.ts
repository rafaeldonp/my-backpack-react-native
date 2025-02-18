import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, BaseEntity } from "typeorm";
import { Accomodation } from "./Accomodation";
import { Transport } from "./Transport";
import { TravelDay } from "./TravelDay";
import { User } from "./User";

@Entity()
export class Travel extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column('date')
    arrivalDate: string

    @Column('date')
    departureDate: string

    @Column()
    type: string

    @Column('boolean')
    isDone: boolean

    @Column()
    userId: number

    @ManyToOne(() => User, (user) => user.travels)
    user: User

    @OneToMany(() => TravelDay, (travelDay) => travelDay.travel)
    travelDays: TravelDay[]

    @OneToMany(() => Accomodation, (accomodation) => accomodation.travel)
    accomodations: Accomodation[]

    @OneToMany(() => Transport, (transport) => transport.travel)
    transports: Transport[]


    static async createByService(dataObj: any, id: number): Promise<Travel> {
        const newTravel: Travel = Travel.create({
            ...dataObj,
            user: await User.findOneBy({id: id})
        });
        return newTravel.save();
    }


    static async readByService(id: number) {
        return Travel.findBy({userId: id});
    }

}