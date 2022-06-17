export interface Task {
    _id?: number;
    title: string;
    description: string;
    dueDate: Date;
    status: boolean;
    type: string;
    token: string;
}
