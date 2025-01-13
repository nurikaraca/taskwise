import { NextResponse } from 'next/server';
import { db } from '@/db';

export async function GET() {
  console.log('Cron job triggered to update expired tasks...');
  try {
    const now = new Date();
    const result = await db.task.updateMany({
      where: {
        dueDate: { lt: now },
        status: { not: 'CLOSED' },
      },
      data: { status: 'CLOSED' },
    });

    console.log(`${result.count} tasks updated to CLOSED`);
    return NextResponse.json({ message: 'Cron job executed successfully', updatedCount: result.count });
  } catch (error) {
    console.error('Error updating tasks:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
