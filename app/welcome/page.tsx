import prisma from '@/lib/db';

export default async function Welcome() {
  const user = await prisma.user.findUnique({ where: { id: 'test' } });
  return <div>Hello {user?.firstName}</div>;
}
