import mongoose from "mongoose";
import zodResolver from 'zod'
import VideoSchema, { transformation } from "../../../schemas/video.schema";

export interface IVideo extends Document {
    _id?: mongoose.Types.ObjectId,
    title:string,
    description:string,
    videoURL:string,
    thumbnailURL:string,
    controls?:boolean,
    transformation:{
        height:number,
        width:number,
        quality?:number
    }
}

const videoSchema = new mongoose.Schema<IVideo>({
    title:{
        type:String,
        required:true
    },
    
    description:{
        type:String,
        required:true
    },
    videoURL:{
        type:String,
        required:true
    },
    thumbnailURL:{
        type:String,
        required:true
    },
    controls:{
        type:Boolean,
        default:true
    },
    transformation:{
        height:{
            type:Number,
            required:true,
            default:1080
        },
        width:{
            type:Number,
            required:true,
            default:1920
        },
    }
},{timestamps:true})

const Video = mongoose.models?.Video || mongoose.model("Video", videoSchema)

export default Video