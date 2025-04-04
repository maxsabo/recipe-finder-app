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

export default async function RecipeInfo({
  recipe,
}: {
  recipe: RecipeDetails;
}) {
  await new Promise((resolve) => setTimeout(resolve, 750));

  return (
    <div className="space-y-6 animate__animated animate__fadeIn">
      <div>
        <h2 className="text-xl font-semibold text-gray-800">
          Preparation Time
        </h2>
        <p className="text-gray-600">{recipe.readyInMinutes} minutes</p>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Ingredients</h2>
        <ul className="list-disc list-inside text-gray-600">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
