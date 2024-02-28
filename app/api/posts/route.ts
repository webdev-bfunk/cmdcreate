import { NextRequest, NextResponse } from 'next/server'
import { json } from 'next/body-parser';
import { prisma } from '@/server/db/client';

interface CreatePostRequestBody {
  title: string;
  content: string;
}

export default async function handle(req: NextRequest, res: NextResponse) {
  await json()(req, res);

  const { method } = req;

  switch (method) {
    case 'POST':
      const { title, content } = req.body as unknown as CreatePostRequestBody;

      const post = await prisma.post.create({
        data: {
          title,
          content,
        },
      });

      res.status(201).json(post);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
