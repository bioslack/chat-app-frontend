import {
  useState,
  useRef,
  ChangeEventHandler,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import { debounce } from "lodash";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import User from "../../../models/User";
import { IMAGE_ROOT_SOURCE } from "../../../api/axios";

interface SearchParticipantProps {
  user: User;
  add: (user: User) => void;
}

const SearchParticipant = function ({ user, add }: SearchParticipantProps) {
  return (
    <div className="search-card">
      <img
        src={`${IMAGE_ROOT_SOURCE}/${user.picture}`}
        className="search-card__picture"
        alt="Profile"
      />
      <div className="search-card__name">{user.name}</div>
      <MdAddCircle
        className="search-card__btn"
        size={25}
        color="#0a0"
        onClick={() => add(user)}
      />
    </div>
  );
};

interface ParticipantProps {
  user: User;
  remove: (id: string) => void;
}

const Participant = function ({ user, remove }: ParticipantProps) {
  return (
    <div className="participant-card">
      <img
        src={`${IMAGE_ROOT_SOURCE}/${user.picture}`}
        className="participant-card__picture"
        alt="Profile"
      />
      <div className="participant-card__name">{user.name}</div>
      <MdRemoveCircle
        className="participant-card__btn"
        size={25}
        color="#f00"
        onClick={() => remove(user._id)}
      />
    </div>
  );
};

interface ParticipantsProps {
  participants: User[];
  setParticipants: Dispatch<SetStateAction<User[]>>;
}

const Participants = function ({
  participants,
  setParticipants,
}: ParticipantsProps) {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
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

  const addParticipant = (user: User) => {
    setParticipants((prev) => [...prev, user]);
  };

  const onBlur = () => {
    setTimeout(() => {
      setSearch("");
      setIsSearching(false);
      setSearchResults([]);
    }, 200);
  };
  const onFocus = () => {
    setIsSearching(true);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearch(event.target.value);
    handleSearchRequest(event.target.value);
  };

  return (
    <>
      <div className="participant">
        <form className="participant__form">
          <input
            className="participant__search-input"
            value={search}
            onChange={handleSearch}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder="Buscar contatos"
          />
          {isSearching && search.trim() && (
            <div className="search-container">
              <SimpleBar
                style={{ maxHeight: 200, width: "100%" }}
                unselectable="on"
              >
                {searchResults
                  .filter(
                    (p) => !participants.map((p) => p._id).includes(p._id)
                  )
                  .map((p) => (
                    <SearchParticipant
                      key={p._id}
                      add={addParticipant}
                      user={p}
                    />
                  ))}
              </SimpleBar>
            </div>
          )}
        </form>
      </div>
      <div className="participant__list">
        {participants.length ? (
          participants.map((p) => (
            <Participant
              key={p._id}
              user={p}
              remove={(id: string) => {
                setParticipants(participants.filter((u) => id !== u._id));
              }}
            />
          ))
        ) : (
          <div style={{ textAlign: "center", padding: 15 }}>
            Adicione contatos
          </div>
        )}
      </div>
    </>
  );
};

export default Participants;
