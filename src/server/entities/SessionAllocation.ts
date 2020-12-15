import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Session } from "./Session";

@Entity()
export class SessionAllocation extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Session, (session) => session.sessionAllocations)
    session: Session;

    @ManyToOne(() => User, (user) => user.sessionAllocations)
    user: User;
}
