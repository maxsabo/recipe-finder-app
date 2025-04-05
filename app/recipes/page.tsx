import { PageProps } from '@/.next/types/app/layout';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

type Recipe = {
  id: number;
  title: string;
  image: string;
};

type RecipesResponse = {
  results: Recipe[];
};

async function fetchRecipes(searchParams: {
  query?: string;
  cuisine?: string;
  maxReadyTime?: string;
}): Promise<RecipesResponse> {
  const { query, cuisine, maxReadyTime } = searchParams;
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}${
    query ? `&query=${query}` : ''
  }${cuisine ? `&cuisine=${cuisine}` : ''}${
    maxReadyTime ? `&maxReadyTime=${maxReadyTime}` : ''
  }`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return res.json();
}

export default async function RecipesPage({searchParams}: PageProps) {
  const resolvedSearchParams = await searchParams;
  const {query, cuisine, maxReadyTime} = resolvedSearchParams || {};

  let recipes: Recipe[] = [];
  let error: string | null = null;

  try {
    const data = await fetchRecipes({query, cuisine, maxReadyTime});
    recipes = data.results;
  } catch (err) {
    error = (err as Error).message;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Recipe Results
        </h1>

        {error ? (
          <p className="text-center text-gray-600 bg-gray-50 p-4 rounded-md shadow-inner">
            Error: {error}
          </p>
        ) : (
          <Suspense
            fallback={
              <p className="text-gray-600 text-center">Loading Recipes...</p>
            }
          >
            {recipes.length === 0 ? (
              <p className="text-center text-gray-600 bg-gray-50 p-4 rounded-md shadow-inner">
                No recipes found.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 animate__animated animate__fadeIn">
                {recipes.map((recipe) => (
                  <Link
                    href={`/recipes/${recipe.id}`}
                    key={recipe.id}
                    className="group bg-white rounded-lg shadow-md p-4 hover:shadow-lg hover:bg-gray-50 transition duration-300"
                  >
                    <div className="overflow-hidden rounded-md">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={300}
                        height={200}
                        quality={100}
                        className="w-full h-40 object-cover rounded-md transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-gray-800">
                      {recipe.title}
                    </h2>
                  </Link>
                ))}
              </div>
            )}
          </Suspense>
        )}
      </div>
    </div>
  );
}
