import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1 className='font-default'>Home Page</h1>
      <Link className='font-headline' href='/transactions'>
        Transactions page
      </Link>
      <Link className='font-headline' href='/dashboard'>
        Dashboard page
      </Link>
      <Link className='font-headline' href='/about'>
        About page
      </Link>
      <Link className='font-headline' href='/categories'>
        Categories page
      </Link>
    </div>
  );
}
