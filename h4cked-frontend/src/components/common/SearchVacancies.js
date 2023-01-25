function SearchVacancies({ value, handleChange }) {
  const handleInputChange = (e) => handleChange(e.target.value);

  return (
    <div className='SearchBar'>
      <div className='container'>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <input
              className='searchInput'
              type='search'
              placeholder='Search Vacancies'
              value={value}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchVacancies;
