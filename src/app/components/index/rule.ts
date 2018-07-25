// the interface that tells angular the kind of backend data that will be desplayed
export interface Rule {
    id: number;
    description: string;
    tags: string[];
}