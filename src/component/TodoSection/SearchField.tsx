import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import React, { useState, useEffect, useRef } from "react";
import { useTodos } from "~/context/TodoContext";
import useSearchQuery from "~/hook/useSearchQuery";

const SearchField: React.FC = () => {
  const searchResultsRef = useRef<HTMLInputElement>(null);
  const [searchInputValue, setSearchInputValue] = useState<string>("");
  
  const matchedTodos = useSearchQuery(searchInputValue);
  const { enableAllVisibility } = useTodos();

  useEffect(() => {
    if (searchInputValue.trim().length > 0) {
        enableAllVisibility(matchedTodos);
    } else {
        enableAllVisibility();
    }
  }, [searchInputValue]);

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); 
  };

  return (
    <div className="flex-1">
      <form className="relative w-full xl:max-w-sm" autoComplete="off" onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only"></label>
        <input
          type="search"
          id="search"
          placeholder="Search todo"
          ref={searchResultsRef}
          onChange={({ currentTarget }) => {
            setSearchInputValue(currentTarget.value);
          }}
          className="w-full inputStyles"
        />
        <MagnifyingGlassIcon className="top-3.5 right-4 absolute w-4 sm:w-5 text-slate-400" />
      </form>
    </div>
  );
};

export default SearchField;
