import { useState } from "react";
import { MdClose, MdAdd } from "react-icons/md";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const fakeParticipants = [
  {
    id: 1,
    name: "Albert Einstein",
    picture: "http://localhost:8888/img/b61533cb922c8291043ccaa835e10bf2.webp",
  },

  {
    id: 2,
    name: "Carl Sagan",
    picture: "http://localhost:8888/img/6a7d4dca626ad0a8b3b6bd7c5cc9579c.png",
  },

  {
    id: 3,
    name: "Muhammad Ali",
    picture: "http://localhost:8888/img/314c0bf8f6c1ab5d1aaa6319efcf1df0.jpeg",
  },

  {
    id: 4,
    name: "Stephen Hawking",
    picture: "http://localhost:8888/img/fe7f5c0be2f1753f831fa42aa17bef60.webp",
  },

  {
    id: 5,
    name: "Martin Luther King Jr.",
    picture: "http://localhost:8888/img/919db473870a7d19ac10625bf4435f58.jpeg",
  },

  {
    id: 6,
    name: "Luis Pereira",
    picture: "http://localhost:8888/img/c35322360e3aed24195557ebc96b4d48.png",
  },
];

interface ParticipantProps {
  id: number;
  name: string;
  picture: string;
  add: (id: string | number) => void;
}

const Participant = function ({ id, name, picture, add }: ParticipantProps) {
  return (
    <div className="participant__user">
      <img src={picture} className="participant__picture" />
      <div className="participant__name">{name}</div>
      <MdAdd
        className="participant__btn"
        size={25}
        color="#000"
        onClick={() => add(id)}
      />
    </div>
  );
};

const Participants = function () {
  const [isSearching, setIsSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [participants, setParticipants] = useState<Array<string | number>>([]);

  const addParticipant = (id: string | number) => {
    setParticipants((prev) => [...prev, id]);
  };

  const onBlur = () => {
    if (!search) setIsSearching(false);
  };
  const onFocus = () => {
    setIsSearching(true);
  };

  return (
    <div className="participant">
      <form className="partcipant__form">
        <div className="participant__wrapper">
          <input
            className="participant__search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          {isSearching && search.trim() && (
            <SimpleBar className="participant__result-list" unselectable="on">
              {fakeParticipants
                .filter(
                  (p) =>
                    p.name
                      .toLowerCase()
                      .includes(
                        (search.trim() || `${Date.now()}`).toLowerCase()
                      ) && !participants.includes(p.id)
                )
                .map((p) => (
                  <Participant key={p.id} add={addParticipant} {...p} />
                ))}
            </SimpleBar>
          )}
        </div>
      </form>
    </div>
  );
};

export default Participants;

{
  /* <form className="participant__search-form">
        <input
          className="participant__search"
          placeholder="Busca por nome, email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {search && (
          <MdClose
            size={18}
            color="#000"
            className="participant__search-reset"
            onClick={() => {
              setIsSearching(false);
              setSearch("");
            }}
          />
        )}
        <div className="participant__search-list">
        {fakeParticipants
            .filter(
              (p) =>
                !participants.includes(p.id) &&
                p.name
                  .toLocaleLowerCase()
                  .includes(
                    search.trim().toLocaleLowerCase() || `${Date.now()}`
                  )
            )
            .map((p) => (
              <Participant
                key={p.id}
                id={p.id}
                name={p.name}
                picture={p.picture}
                add={addParticipant}
              />
            ))}
        </div>
      </form>
      {fakeParticipants
        .filter((p) => participants.includes(p.id))
        .map((p) => (
          <Participant
            key={p.id}
            id={p.id}
            name={p.name}
            picture={p.picture}
            add={addParticipant}
          />
        ))} */
}
