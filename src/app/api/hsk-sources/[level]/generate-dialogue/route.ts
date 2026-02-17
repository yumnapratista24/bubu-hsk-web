import { type NextRequest, NextResponse } from 'next/server';

const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_KEY = process.env.API_KEY;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ level: string }> }
) {
  try {
    const { level } = await params;
    const { searchParams } = new URL(request.url);
    const complexity = searchParams.get('complexity') || '1';

    if (!(API_HOST && API_KEY)) {
      return NextResponse.json(
        { error: 'API configuration missing' },
        { status: 500 }
      );
    }

    const apiUrl = `${API_HOST}/api/hsk-sources/${level}/generate-dialogue?complexity=${complexity}`;

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('API fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to generate dialogue' },
      { status: 500 }
    );
  }
}
