import db from '@/db';
import { MdEdit } from 'react-icons/md';
import { create, deleteCategory } from './actions';
import FormButton from './formButton';
import { DeleteButton } from '@/components';

export default async function Categories() {
  'use server';

  const categories = await db.category.findMany({
    where: { userId: 'root' },
  });

  return (
    <div>
      <h2 className='font-headline text-xl mb-12'>Categories</h2>
      <form action={create}>
        <label htmlFor='category' className='sr-only'>
          Category
        </label>
        <input
          type='text'
          id='categoryName'
          name='categoryName'
          className='w-full bg-off-white rounded-lg px-4 py-2 mb-4'
          placeholder='Category'
        />
        <FormButton />
      </form>
      <ul className='flex flex-col gap-4'>
        {categories.map((category) => (
          <li
            key={category.id}
            className='w-80 flex justify-between items-center bg-lavender rounded-lg px-4 py-2'
          >
            {category.name}
            <div className='flex'>
              <MdEdit className='w-5 h-5 ml-4 mr-1' />
              <DeleteButton id={category.id} callback={deleteCategory} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
