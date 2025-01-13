import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  console.log('Cron job triggered to update expired tasks...');
  try {
    const now = new Date();
    const result = await prisma.task.updateMany({
      where: {
        dueDate: { lt: now },
        status: { not: 'CLOSED' },
      },
      data: { status: 'CLOSED' },
    });

    console.log(`${result.count} tasks updated to CLOSED`);
    return res.status(200).json({ message: 'Cron job executed successfully', updatedCount: result.count });
  } catch (error) {
    console.error('Error updating tasks:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
