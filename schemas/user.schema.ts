import * as z from "zod/v4";

const UserSchema = z.object({
    username:z.string().maxLength
})