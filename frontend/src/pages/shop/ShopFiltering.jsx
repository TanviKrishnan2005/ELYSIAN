import React from 'react'

const ShopFiltering = ({ filters, filtersState, setFiltersState, clearFilters }) => {
    return (
        <div className='space-y-5 flex-shrink-0'>
            <h3>Filters</h3>

            {/* category */}
            <div className='flex flex-col space-y-2'>
                <h4 className='font-medium text-lg'>Category</h4>
                <hr />
                {
                    filters.categories.map((category) => (
                        <label key={category} className='capitalize cursor-pointer'>
                            <input type="radio" name="category" id="category" value={category}
                                checked={filtersState.category === category}
                                onChange={(e) => setFiltersState({ ...filtersState, category: e.target.value })}
                            />
                            <span className='ml-1'>{category}</span>
                        </label>
                    ))
                }
            </div>

            {/* colors */}
            <div>
                <div className='flex flex-col space-y-2'>
                    <h4 className='font-medium text-lg'>Color</h4>
                    <hr />
                    {
                        filters.colors.map((color) => (
                            <label key={color} className='capitalize cursor-pointer'>
                                <input type="radio" name="color" id="color" value={color}
                                    checked={filtersState.color === color}
                                    onChange={(e) => setFiltersState({ ...filtersState, color: e.target.value })}
                                />
                                <span className='ml-1'>{color}</span>
                            </label>
                        ))
                    }
                </div>
            </div>

            {/* price range */}
            <div>
                <div className='flex flex-col space-y-2'>
                    <h4 className='font-medium text-lg'>Price Range</h4>
                    <hr />
                    {
                        filters.priceRange.map((range) => (
                            <label key={range.label} className='capitalize cursor-pointer'>
                                <input type="radio" name="priceRange" id="priceRange" value={`${range.min}-${range.max}`}
                                    checked={filtersState.priceRange === `${range.min}-${range.max}`}
                                    onChange={(e) => setFiltersState({ ...filtersState, priceRange: e.target.value })}
                                />
                                <span className='ml-1'>{range.label}</span>
                            </label>
                        ))
                    }
                </div>
            </div>

            {/* clear all filter */}
            <button
                onClick={clearFilters}
                style={{ backgroundColor: '#ed3849', color: 'white', padding: '4px 16px', borderRadius: '6px' }}
            >
                Clear All Filter
            </button>


        </div>
    )
}

export default ShopFiltering