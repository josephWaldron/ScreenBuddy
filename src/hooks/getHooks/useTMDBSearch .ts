import { useState, useEffect } from "react";
import axios from "axios";

export interface ApiContent {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  vote_average: number;
  poster_path: string;
}

interface ApiResponse {
  results: ApiContent[];
}

export interface Content {
  id: number;
  title: string;
  rating: number;
  image_url: string;
}

const api_key = import.meta.env.VITE_TMDB_API_KEY;

const useSearch = (searchText: string) => {
  const [results, setResults] = useState<Content[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchText) {
        return;
      }

      setIsLoading(true);

      try {
        const response = await axios.get<ApiResponse>(
          `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&language=en-US&query=${searchText}&include_adult=false`
        );
        const apiResults = response.data.results;

        const searchResults = apiResults.map((apiResult) => {
          let title, rating, image_url;

          if (apiResult.media_type === "movie") {
            title = apiResult.title;
            rating = apiResult.vote_average;
            image_url = apiResult.poster_path
              ? `https://image.tmdb.org/t/p/w500${apiResult.poster_path}`
              : "";
          } else if (apiResult.media_type === "tv") {
            title = apiResult.name;
            rating = apiResult.vote_average;
            image_url = apiResult.poster_path
              ? `https://image.tmdb.org/t/p/w500${apiResult.poster_path}`
              : "";
          } else {
            // Not a movie or TV show
            return null;
          }

          return {
            id: apiResult.id,
            title,
            rating,
            image_url,
          };
        });

        // Filter out any null search results
        const filteredSearchResults = searchResults.filter(
          (searchResult): searchResult is Content => searchResult !== null
        );
        setResults(filteredSearchResults);
      } catch (error) {
        console.error("Error searching for content:", error);
      }

      setIsLoading(false);
    };

    fetchSearchResults();
  }, [searchText]);

  return { results, isLoading };
};

export default useSearch;
