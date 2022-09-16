import { useState, useRef, ChangeEventHandler, useEffect } from "react";
import { MdAdd } from "react-icons/md";
import { debounce } from "lodash";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import User from "../../../models/User";

interface ParticipantProps extends User {
  add: (id: string | number) => void;
}

const Participant = function ({ _id, name, picture, add }: ParticipantProps) {
  return (
    <div className="participant__user">
      <img
        src={`http://localhost:8888/img/${picture}`}
        className="participant__picture"
        alt="Profile"
      />
      <div className="participant__name">{name}</div>
      <MdAdd
        className="participant__btn"
        size={25}
        color="#000"
        onClick={() => add(_id)}
      />
    </div>
  );
};

const Participants = function () {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState<Array<string | number>>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const axios = useAxiosPrivate();

  const handleSearchRequest = useRef(
    debounce(async (query: string) => {
      console.log("Another request");
      setSearchResults((await axios.get(`users?name=${query}`)).data.users);
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      handleSearchRequest.cancel();
    };
  }, [handleSearchRequest]);

  const addParticipant = (id: string | number) => {
    setParticipants((prev) => [...prev, id]);
  };

  const onBlur = () => {
    if (!search) setIsSearching(false);
  };
  const onFocus = () => {
    setIsSearching(true);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    handleSearchRequest(event.target.value);
  };

  return (
    <div className="participant">
      <form className="partcipant__form">
        <div className="participant__wrapper">
          <input
            className="participant__search-input"
            value={search}
            onChange={handleSearch}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {isSearching && search.trim() && (
            <SimpleBar className="participant__result-list" unselectable="on">
              {searchResults
                .filter((p) => !participants.includes(p._id))
                .map((p) => (
                  <Participant key={p._id} add={addParticipant} {...p} />
                ))}
            </SimpleBar>
          )}
        </div>
      </form>
    </div>
  );
};

export default Participants;
