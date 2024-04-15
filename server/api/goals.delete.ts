import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
    const goal = await readBody(event).then((value) => {return value});
    const deleteGoal = await prisma.goals.delete({
        where: {
            name: goal.name
        }
    })
    return deleteGoal;
})