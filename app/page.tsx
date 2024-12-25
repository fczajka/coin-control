import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='font-default'>Home Page</h1>
      <Link className='font-headline' href='/profile'>
        Profile page
      </Link>
    </div>
  );
}
