import Chat from "./Chat";

interface User extends Chat{
  email: string;
  createdAt: number;
}

export default User;
