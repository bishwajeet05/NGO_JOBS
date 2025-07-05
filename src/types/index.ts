export interface User {
    id?: number;
    name?: string;
    email: string;
    password: string;
    role?: string;
    is_active?: boolean;
    created_at?: Date;
}