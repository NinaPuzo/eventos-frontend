import type { Category } from "@shared/types/Category";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../api/categoryService";

function NavBar() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija.", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <nav className="flex flex-row gap-10 ">
      {categories &&
        categories.map((category) => (
          <Link key={category.id} to={`/events?categoryId=${category.id}`}>
            {category.categoryName}
          </Link>
        ))}
    </nav>
  );
}
export default NavBar;
