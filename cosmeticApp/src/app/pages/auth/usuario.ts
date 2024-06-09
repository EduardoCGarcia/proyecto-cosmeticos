export type Roles = 'user' | 'admin';

export interface User {
    email: string,
    password: string
}

export interface UserResponse extends User{
    token:string,
    user:{        
        name: string,
        lastname: string,
        num_cuenta: string,
        email: string,
        password: string,
        token: string,
        expiresIn: string,
        userId: number,
        role: Roles,
        avatar: string
    }
}