import './FilterSelect.css'

function FilterSelect({ onFilter, name }) {
  
  const handleFilter = (e) => {
    onFilter(e.target.value, name);
  }

  return (
    <div className='custom-select'>
      <select name="select" onChange={handleFilter}>
        <option value="" disabled selected>Sort By</option>
        <option value="alphabet">A-Z</option>
        <option value="rating">Rating</option>
      </select>
    </div>
  )
}


export default FilterSelect
