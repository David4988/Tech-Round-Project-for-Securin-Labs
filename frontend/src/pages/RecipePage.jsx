import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/recipes/${id}`
      );
      setRecipe(res.data);
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <img src={recipe.image_url} className="w-full h-64 object-cover mb-4" />

      <h1 className="text-2xl font-bold mb-2">{recipe.title}</h1>

      <p className="text-gray-600 mb-4">{recipe.description}</p>

      <h3 className="font-semibold mt-4">Ingredients</h3>
      <ul className="list-disc ml-6">
        {recipe.ingredients?.map((i, idx) => (
          <li key={idx}>{i}</li>
        ))}
      </ul>

      <h3 className="font-semibold mt-4">Instructions</h3>
      <ol className="list-decimal ml-6">
        {recipe.instructions?.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipePage;
