import Chat from "./Chat";

interface Group extends Chat {
  _id: string;
  members: string[];
  admins: string[];
}

export default Group;
