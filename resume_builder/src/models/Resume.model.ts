import mongoose from "mongoose";
import {IResume} from "@/types/resume.types"



const resumeSchema = new mongoose.Schema<IResume>({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        default:""
    },
    summary:{
        type:String,
       default:""
    },
    personalInfo:{
        type:{
            fullname:String,
            email:String,
            mobile:String,
            location:String,
            github:String,
            linkedIn:String,
            portfolio:String,
        },
        default:{}
    },
    education:{
        type:[
            {
                institution:String,
                degree:String,
                startDate:String,
                endDate:String,
            }
        ],
        default:[]
    },
    workExperience:{
        type:[
            {
                 company:String,
    position:String,
    startDate:String,
    endDate:String,
    description:String

            }
        ],
        default:[]
    },
    projects:{
        type:[
            {
                 title:String,
                 description:String,
                 liveUrl:String,
                 githubUrl:String,
                 techStack:[String],
            }
        ],
        default:[]
    },
    skills:{
            type:[String],
            default:[]
    },
    certifications:{
        type:[String],
        required:false
    },    

},{
    timestamps:true

})


const ResumeModel = mongoose.model('Resume',resumeSchema)


export default ResumeModel
