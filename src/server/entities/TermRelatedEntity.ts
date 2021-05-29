import { Term } from "./Term";

export interface TermRelatedEntity {
    getTerm(): Promise<Term>;
}
