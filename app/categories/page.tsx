import db from '@/db';
import { createCategory, deleteCategory } from './actions';
import { DeleteButton, FormButton } from '@/components';
import { IoMdAddCircle } from 'react-icons/io';
import EditModal from './editModal';

export default async function Categories() {
  'use server';

  const categories = await db.category.findMany({
    where: { userId: 'root' },
    orderBy: { name: 'asc' },
  });

  return (
    <div>
      <h2 className='font-headline text-xl mb-12'>Categories</h2>
      <form action={createCategory} className='pb-4'>
        <label htmlFor='categoryName'>Category</label>
        <input
          type='text'
          id='categoryName'
          name='categoryName'
          className='w-full bg-lavender/20 rounded-lg px-4 py-2 mb-4'
        />
        <FormButton fullFlex>
          Add new category
          <IoMdAddCircle className='ml-2 w-5 h-5' />
        </FormButton>
      </form>
      <ul className='flex flex-col gap-4'>
        {categories.map((category) => (
          <li
            key={category.id}
            className='w-80 flex justify-between items-center bg-lavender rounded-lg px-4 py-2'
          >
            {category.name}
            <div className='flex gap-1 ml-4'>
              <EditModal categoryId={category.id} name={category.name} />
              <DeleteButton id={category.id} callback={deleteCategory} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
