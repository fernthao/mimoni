import { prisma } from '../../prisma/db'

export default defineEventHandler(async (event) => {
    let goalData: {
        name: string, 
        description: string, 
        saved: number, 
        target: number
    };
    goalData = await readBody(event).then((value) => {return value})
    const updateGoal = await prisma.goals.update({
        where: {
          name: goalData.name,
        },
        data: {
          description: goalData.description,
          saved: goalData.saved,
          target: goalData.target
        },
      }).catch((error: any) => {
        console.log(error);
    })

    return updateGoal;
})

