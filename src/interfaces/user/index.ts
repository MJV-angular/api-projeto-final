
export interface UserRequest {
    email: string;
    name: string;
    password: string;
    cpf: string;
    dateBirth: Date;
    picture: string | null;
    address: addressRequest;
    admin: boolean;
}

export interface addressRequest {
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}

export interface addressResponse {
    id: number;
    street: string;
    number: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
}
export interface UserResponse {
    id: number;
    createdAt: Date;
    email: string;
    name: string;
    cpf: string;
    picture: string | null;
    admin: boolean;
    address: addressResponse
}


export interface Courses {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface CourseContent {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    categories: Categories[];
}

export interface Categories {
    id: number;
    name: string;
    courseContentId: number;
}

export interface UserCourses{
    id: number;
    courseId: number;
    userId: number;
}
export interface Comment {
    id: number;
    createdAt: Date;
    text: string;
    authorId: number;
    postId: number| null;
}

