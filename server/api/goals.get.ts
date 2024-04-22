import { prisma } from '../../prisma/db'

// https://nuxt.com/docs/guide/directory-structure/server
export default defineEventHandler(async (event) => {
    const goalList = await prisma.goals.findMany()
    .catch((error: any) => {
        console.log(error);
    });

    return goalList;
});
