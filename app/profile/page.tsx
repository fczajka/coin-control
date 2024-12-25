import prisma from '@/lib/db';

export default async function Profile() {
  const user = await prisma.user.findUnique({ where: { id: 'root' } });
  return <div>Hello {user?.firstName}</div>;
}
