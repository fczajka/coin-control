import { get } from '@vercel/edge-config';

export default async function Home() {
  const data = await get('greeting');

  return <div> {data && data.toString()}</div>;
}
