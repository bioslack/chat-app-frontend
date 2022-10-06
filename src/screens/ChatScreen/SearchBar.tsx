import { ChangeEventHandler } from "react";
import { MdClose } from "react-icons/md";
import useSidebar from "../../hooks/useSidebar";

interface SearchBarProps {
  search: string;
  setSearch: (text: string) => void;
}

const SearchBar = ({ search, setSearch }: SearchBarProps) => {
  const { setClassName } = useSidebar();
  const handleSearchInput: ChangeEventHandler<HTMLInputElement> = function (
    event
  ) {
    setSearch(event.target.value);
  };

  return (
    <form className="searchbar" onSubmit={(e) => e.preventDefault()}>
      <input
        className="searchbar__input"
        value={search}
        onChange={handleSearchInput}
        placeholder="Contatos, grupos..."
      />
    </form>
  );
};

export default SearchBar;
