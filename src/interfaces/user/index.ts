
export interface UserRequest {
email: string;
name: string;
password: string;

}

export interface UserResponse {
    id: number;
    createdAt: Date;
    email: string;
    name: string;
}