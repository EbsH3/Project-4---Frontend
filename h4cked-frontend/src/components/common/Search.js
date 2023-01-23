function Search({ value, handleChange }) {
  const handleInputChange = (e) => handleChange(e.target.value);

  return (
    <div className='search'>
      <div className='container'>
        <div className='field has-addons'>
          <div className='control is-expanded'>
            <input
              type='search'
              className='searchInput'
              placeholder='Find Employer'
              value={value}
              onChange={handleInputChange}
            />
          </div>
          <div className='control'>
            <span className='button is-info is-small'>Search</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
