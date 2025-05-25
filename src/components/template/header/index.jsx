import { Link } from "react-router-dom";
import { img } from "../../../data/img";

export function Header() {
  return (
    <header className="bg-white dark:bg-gray-800 shadow shadow-top-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex  justify-center  p-4">
          <Link
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            <img src={img.template.header.zeero} className="h-16" />
          </Link>
        </div>
      </div>
    </header>
  );
}
