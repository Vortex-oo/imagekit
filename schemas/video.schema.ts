import {z} from 'zod'

export const transformation = z.object({
        width: z.number().min(1080).max(1080),
        height: z.number().min(1920).max(1920),
    })

const VideoSchema = z.object({
    title:z.string().min(1, "title is required"),
    description:z.string().min(1, "description is required"),

    transformation: transformation
})

export default VideoSchema
