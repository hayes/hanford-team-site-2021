import Link from 'next/link';
import { ViewCount } from './ViewCount';

export function Header({ page }: { page: string }) {
  return (
    <div className="h-[70px]">
      <nav className="w-full shadow-lg absolute top-0 left-0">
        <div className="max-w-[700px] m-auto py-4">
          <Link href="/" passHref>
            <span
              className={`text-lg tracking-wider lg:mx-4 mx-1 border-black pb-1 px-1 hover:border-b cursor-pointer ${
                page === 'home' ? 'border-b' : ''
              }`}
            >
              Home
            </span>
          </Link>
          <Link href="/coffee" passHref>
            <span
              className={`text-lg tracking-wider lg:mx-4 mx-1 border-black pb-1 px-1 hover:border-b cursor-pointer ${
                page === 'coffee' ? 'border-b' : ''
              }`}
            >
              Coffee
            </span>
          </Link>
          <Link href="/comments" passHref>
            <span
              className={`text-lg tracking-wider lg:mx-4 mx-1 border-black pb-1 px-1 hover:border-b cursor-pointer ${
                page === 'comments' ? 'border-b' : ''
              }`}
            >
              Comments
            </span>
          </Link>
        </div>
        <div className="absolute top-0 right-4 h-full flex items-center text-xs md:text-base">
          <ViewCount name={page} />
        </div>
      </nav>
    </div>
  );
}
