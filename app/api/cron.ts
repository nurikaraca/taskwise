import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Authorization check (optional but recommended for security)
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Current date and time
    const now = new Date();

    // Update expired tasks
    const result = await prisma.task.updateMany({
      where: {
        dueDate: { lt: now },
        status: { not: 'CLOSED' },
      },
      data: { status: 'CLOSED' },
    });

    console.log(`${result.count} tasks updated to CLOSED`);
    res.status(200).json({ message: `${result.count} tasks updated to CLOSED` });
  } catch (error) {
    console.error('Error in cron job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
}
