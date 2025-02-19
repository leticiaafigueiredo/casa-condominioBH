import React, { useState } from "react";

const FiltroProduto = () => {
  const [filters, setFilters] = useState({
    category: [],
    priceRange: 500,
    rating: null,
    inStock: false,
    freeShipping: false,
    search: "",
    sortBy: "relevance",
  });

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);

    setFilters((prevFilters) => ({ ...prevFilters, category: selectedCategories }));
  };

  const handleRatingChange = (e) => {
    setFilters((prevFilters) => ({ ...prevFilters, rating: e.target.value }));
  };

  const handleReset = () => {
    setFilters({
      category: [],
      priceRange: 500,
      rating: null,
      inStock: false,
      freeShipping: false,
      search: "",
      sortBy: "relevance",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Saved filters:", filters);
  };

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-header bg-primary bg-gradient text-white">
              <h5 className="mb-0">Advanced Filters</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label" htmlFor="category">
                      Category
                    </label>
                    <select
                      className="form-select"
                      id="category"
                      multiple
                      value={filters.category}
                      onChange={handleCategoryChange}
                    >
                      <option value="electronics">Electronics</option>
                      <option value="clothing">Clothing</option>
                      <option value="books">Books</option>
                      <option value="home">Home & Garden</option>
                    </select>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label">Price Range</label>
                    <div className="range">
                      <input
                        type="range"
                        className="form-range"
                        id="priceRange"
                        min="0"
                        max="1000"
                        step="10"
                        value={filters.priceRange}
                        onChange={handleInputChange}
                      />
                      <div className="d-flex justify-content-between">
                        <span>$0</span>
                        <span id="priceValue">${filters.priceRange}</span>
                        <span>$1000</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label">Rating</label>
                    <div className="btn-group w-100" role="group">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <React.Fragment key={star}>
                          <input
                            type="radio"
                            className="btn-check"
                            name="rating"
                            id={`rating${star}`}
                            value={star}
                            checked={filters.rating === `${star}`}
                            onChange={handleRatingChange}
                          />
                          <label className="btn btn-outline-primary" htmlFor={`rating${star}`}>
                            {star}★
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label">Availability</label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="inStock"
                        checked={filters.inStock}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="inStock">
                        In Stock
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="freeShipping"
                        checked={filters.freeShipping}
                        onChange={handleInputChange}
                      />
                      <label className="form-check-label" htmlFor="freeShipping">
                        Free Shipping
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label" htmlFor="search">
                      Search
                    </label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <i className="bi bi-search"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="search"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <label className="form-label">Sort By</label>
                    <select
                      className="form-select"
                      id="sortBy"
                      value={filters.sortBy}
                      onChange={handleInputChange}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Average Rating</option>
                    </select>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12 d-flex justify-content-between align-items-center">
                    <button type="button" className="btn btn-outline-secondary" onClick={handleReset}>
                      Reset Filters
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Filters
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltroProduto;
