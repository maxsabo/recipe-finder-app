import RecipeInfo from '@/app/components/RecipeInfo';
import Image from 'next/image';
import { Suspense } from 'react';

type RecipeDetails = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  extendedIngredients: {
    id: number;
    original: string;
  }[];
};

async function fetchRecipeDetails(id: string): Promise<RecipeDetails> {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return res.json();
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  let recipe: RecipeDetails | null = null;
  let error: string | null = null;

  try {
    recipe = await fetchRecipeDetails(params.id);
  } catch (err) {
    error = (err as Error).message;
  }

  if (error || !recipe) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <p className="text-center text-gray-600 bg-gray-50 p-4 rounded-md shadow-inner">
            Error: {error || 'Recipe not found'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 animate__animated animate__fadeIn">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {recipe.title}
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Image
            src={recipe.image}
            alt={recipe.title}
            width={500}
            height={300}
            className="w-full h-64 object-cover rounded-md mb-6"
          />
          <Suspense
            fallback={
              <p className="text-gray-600 text-center">
                Loading recipe details...
              </p>
            }
          >
            <RecipeInfo recipe={recipe} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
