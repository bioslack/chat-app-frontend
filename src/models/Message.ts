interface Message {
  _id: String;
  sender: String;
  receiver: String;
  text: String;
  createdAt: Number;
}

export default Message;
