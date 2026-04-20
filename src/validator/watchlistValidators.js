import {z} from 'zod';

const watchlistAddSchema = z.object({
    movieId: z.string().uuid({message:"Invalid movie ID format"}),
    status:z.enum(
        ["PLANNED","WATCHING","COMPLETED","DROPPED"],{
        error:()=>{
            message:"Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED"
        }}
    ).optional(),
    rating: z.coerce
    .number()
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating must be at most 10" })
    .optional(),
    notes: z.string().optional()
})

const watchlistUpdateSchema = z.object({
    status:z.enum(
        ["PLANNED","WATCHING","COMPLETED","DROPPED"],{
        error:()=>{
            message:"Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED"
        }}
    ).optional(),
    rating: z.coerce
    .number()
    .int({ message: "Rating must be an integer" })
    .min(1, { message: "Rating must be at least 1" })
    .max(10, { message: "Rating must be at most 10" })
    .optional(),
    notes: z.string().optional()
})

export { watchlistAddSchema, watchlistUpdateSchema }