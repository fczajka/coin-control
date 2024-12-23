import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  console.log('Home page');
  return (
    <div>
      <h1>Home Page</h1>
      <Link href='/welcome'>Welcome page</Link>
    </div>
  );
}
