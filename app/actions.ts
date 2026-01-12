"use server"

import z from "zod"
import { postSchema } from "./schemas/blog"
import { error } from "console"
import {fetchMutation} from "convex/nextjs"
import { title } from "process"
import { api } from "@/convex/_generated/api"
import { redirect } from "next/navigation"

export async function createBlogActions(values: z.infer<typeof postSchema>) {
    const parsed = postSchema.safeParse(values);

    if(!parsed.success){
        throw new Error("something went wrong");
    }

    await fetchMutation(
        api.posts.createPost,
            {title: parsed.data.title,
            body: parsed.data.content}

        )

        return redirect("/")
}
