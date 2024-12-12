import { useState, useEffect, useRef } from "react";

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
        if (searchInputRef.current && !searchInputRef.current.contains(event.target)) {
            setResults([]);
            setQuery('');
        }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
        document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const performSearch = async () => {
        if (query.length < 1) {
        setResults([]);
        return;
        }

        setIsSearching(true);
        
        try {
        const response = await fetch(`/search?search=${query}`);
        const data = await response.json();
        setResults(data);
        } catch (error) {
        console.error('Error fetching search results:', error);
        setResults([]);
        } finally {
        setIsSearching(false);
        }
    };

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
        performSearch();
        }, 300);

        return () => clearTimeout(debounceSearch);
    }, [query]);

    return (
        <div className="relative">
        <div className="flex relative flex-1 max-w-xl">
            <input
            ref={searchInputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white text-black text-base font-normal rounded-full border border-slate-300 w-full lg:w-[500px] px-4 py-2 hover:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400 transition-all duration-200"
            type="search"
            spellCheck='false'
            placeholder="Search courses..."
            autoComplete="off"
            />
        </div>

        {/* Search Results Dropdown */}
        {(isSearching || query.length >= 1) && (
            <div className="block absolute z-50 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-[350px] overflow-auto">
            <div className="p-2">
                {/* Loading indicator */}
                {isSearching && (
                <div className="text-center py-2">
                    <svg className="animate-spin h-5 w-5 mx-auto text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                )}

                {/* Results list */}
                {!isSearching && results.length > 0 && results.map((result) => (
                <a key={result.id} href={`/course/${result.id}/details/`} className="flex w-full items-center px-4 py-2 hover:bg-blue-100 rounded transition-colors">
                    <div>
                    <div className="text-sm font-medium">{result.name}</div>
                    <div className="text-xs text-gray-500">in {result.category.name}</div>
                    </div>
                </a>
                ))}

                {/* No results message */}
                {!isSearching && query.length >= 1 && results.length === 0 && (
                <div className="text-center py-2 text-gray-500">No results found</div>
                )}
            </div>
            </div>
        )}
        </div>
    );    
};

export default SearchBar;
