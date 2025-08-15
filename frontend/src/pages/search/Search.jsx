import React, { useState } from 'react'
import ProductCards from "../shop/ProductCards"

import productsData from "../../data/products.json"
const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");
 
    const [filteredProducts, setFilteredProducts] = useState(productsData);


    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = productsData.filter(product => product.name.toLowerCase().includes
            (query) || product.description.toLowerCase().includes(query));

        setFilteredProducts(filtered);
    }
    return (
        <>
            <section
                className="section__container"
                style={{ backgroundColor: '#f4e5ec' }}
            >
                <h2 className="section__header capitalize">SEARCH ITEMS</h2>
                <p className="section__subheader">
                    Browse a diverse range of categories from chic dresses to versatile accessories
                </p>
            </section>

            <section className='section__container'>
  <div className="flex justify-center items-center gap-2 mt-5">
    <input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      className="search-bar w-[500px] p-3 border rounded"
      placeholder="Search for Products.."
    />
    <button
      onClick={handleSearch}
      className="search-button py-3 px-6 bg-[#ed3849] text-white rounded"
    >
      Search
    </button>
  </div>

  <ProductCards products={filteredProducts} />
</section>

        </>
    )
}

export default Search