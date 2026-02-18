import { useEffect, useRef } from "react";
import RecipeCard from "./RecipeCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

function RecipeGrid({ recipes, onSelect }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".card");

      gsap.from(cards, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: {
          each: 0.15,
          grid: "auto",
        },
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 85%",
        },
      });
    }, gridRef);

    return () => ctx.revert();
  }, [recipes]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    >
      {recipes.map((r) => (
        <RecipeCard key={r.id} recipe={r} onSelect={onSelect} />
      ))}
    </div>
  );
}

export default RecipeGrid;
