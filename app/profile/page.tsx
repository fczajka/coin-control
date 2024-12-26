import db from '@/db';

export default async function Profile() {
  const user = await db.user.findUnique({ where: { id: 'root' } });
  return <div>Hello {user?.firstName}</div>;
}
