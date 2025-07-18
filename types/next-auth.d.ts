import "next-auth"

declare module "next-auth" {
    interface Session {
        user: {
            id: string
            username: string
            email: string
        }
    }

    interface User {
        _id: string
        username: string
        email: string
    }
}