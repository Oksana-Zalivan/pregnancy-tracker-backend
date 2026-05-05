import { NextResponse } from 'next/server';
import emotions from '@/db/data/emotions.json';

export async function GET() {
  try {
    return NextResponse.json({
      message: 'Емоції успішно отримані',
      data: emotions,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Помилка отримання емоцій',
      },
      { status: 500 }
    );
  }
}