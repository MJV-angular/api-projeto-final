
export interface UserRequest {
    email: string;
    name: string;
    password: string;
    cpf: string;
    dateBirth: Date,
    picture: string | null;
}

export interface UserResponse {
    id: number;
    createdAt: Date;
    email: string;
    name: string;
}