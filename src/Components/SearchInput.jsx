import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, X } from 'lucide-react'
import { setSearchTerms, clearSearch } from '../features/products/ProductSlice'

function SearchInput() {
  const dispatch = useDispatch()
  const searchTerm = useSelector((state) => state.products.searchTerms)
  const suggestions = useSelector((state) => state.products.suggestions)

  return (
    <div className="w-full max-w-xl relative">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Products"
          className="bg-zinc-100 rounded-md border border-zinc-200 focus:outline-none py-3 pl-10 pr-12 w-full"
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerms(e.target.value))}
        />

        <button
          type="button"
          onClick={() => dispatch(clearSearch())}
          aria-label="clear search"
          className={`absolute right-3 top-1/2 -translate-y-1/2 transition-opacity
            ${searchTerm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <X size={16} className="text-gray-600" />
        </button>
      </div>

      {searchTerm && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {suggestions && suggestions.length > 0 ? (
            suggestions.slice(0, 8).map((item) => (
              <div
                key={item.id}
                onClick={() => dispatch(setSearchTerms(item.title))}
                className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <span className="truncate">{item.title}</span>
                <span className="text-xs text-gray-500 ml-auto">{item.category}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  )
}

export default SearchInput
