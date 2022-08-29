const SearchBar = () => {
  return (
    <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
      <input className="searchbar__input" placeholder="Contatos, grupos..." />
    </form>
  );
};

export default SearchBar;
