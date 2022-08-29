import Flexbox from "../Flexbox";
import Chat from "../../models/Chat";

interface HistoryItemType {
  chat: Chat;
}

const HistoryItem = function (props: HistoryItemType) {
  const { chat } = props;
  return (
    <Flexbox direction="column" className="chat-history__item">
      <div className="chat-history__photo"></div>
      <Flexbox direction="row" style={{ marginLeft: 15 }}>
        <div className="chat-history__item-title">{chat.name}</div>
        <div>Lorem ipsum dolor sit...</div>
      </Flexbox>
    </Flexbox>
  );
};

export default HistoryItem;
