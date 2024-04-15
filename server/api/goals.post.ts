import { prisma } from '../../prisma/db'

export default defineEventHandler(async (event) => {
    let goalData: {
        name: string, 
        description: string, 
        saved: number, 
        target: number
    };
    goalData = await readBody(event).then((value) => {return value})
    const addGoal = await prisma.goals.create({
        data: goalData
    })
    return addGoal;
})