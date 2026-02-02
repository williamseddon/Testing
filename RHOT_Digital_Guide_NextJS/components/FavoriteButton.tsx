"use client";

import { useEffect, useState } from "react";
import { readFavorites, toggleFavorite } from "@/lib/favorites";

export default function FavoriteButton({ slug }: { slug: string }) {
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const favs = readFavorites();
    setIsFav(favs.includes(slug));
  }, [slug]);

  return (
    <button
      className={isFav ? "primaryButton" : "pillButton"}
      onClick={() => {
        const next = toggleFavorite(slug);
        setIsFav(next.includes(slug));
      }}
      aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      type="button"
    >
      {isFav ? "★ Saved" : "☆ Save"}
    </button>
  );
}
