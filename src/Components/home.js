import React, { useState } from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faHashtag, faBell, faEnvelope, faBookmark, faList, faUser, faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { faUser as farUser } from '@fortawesome/free-regular-svg-icons';

const Home = () => {
  const [selectedOption, setSelectedOption] = useState('Home');
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState({
    User1: [],
    User2: [],
    User3: []
  });

  const renderContent = () => {
    switch (selectedOption) {
      case 'Home':
        return <div>Welcome to the Home page!</div>;
      case 'Explore':
        return <div>Explore new content here!</div>;
      case 'Notifications':
        return (
          <div>
            <h3>Notifications</h3>
            <ul>
              <li>User1 followed you</li>
              <li>User2 liked your post</li>
              <li>User3 commented on your photo</li>
            </ul>
          </div>
        );
      case 'Messages':
        return renderMessages();
      case 'Bookmarks':
        return <div>These are your bookmarks.</div>;
      case 'Lists':
        return <div>Your lists are displayed here.</div>;
      case 'Profile':
        return <div>This is your profile page.</div>;
      case 'More':
        return <div>Find more options here.</div>;
      default:
        return <div>Welcome to the Home page!</div>;
    }
  };

  const renderMessages = () => {
    if (selectedChatUser) {
      return (
        <div>
          <h3>Chat with {selectedChatUser}</h3>
          <div className="chat-box">
            {messages[selectedChatUser].map((msg, index) => (
              <div key={index} className="chat-message">{msg}</div>
            ))}
          </div>
          <div className="message-box">
            <textarea
              placeholder="Type your message here..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            ></textarea>
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3>Messages</h3>
          <div className="message-people">
            <h4>People you can message</h4>
            <ul>
              <li onClick={() => setSelectedChatUser('User1')}>User1</li>
              <li onClick={() => setSelectedChatUser('User2')}>User2</li>
              <li onClick={() => setSelectedChatUser('User3')}>User3</li>
            </ul>
          </div>
        </div>
      );
    }
  };

  const sendMessage = () => {
    if (messageInput.trim()) {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChatUser]: [...prevMessages[selectedChatUser], messageInput]
      }));
      setMessageInput('');
    }
  };

  return (
    <div className="home">
      <div className="sidebar">
        <h2>Sales-AI-Analyst</h2>
        <ul>
          <li onClick={() => setSelectedOption('Home')}>
            <FontAwesomeIcon icon={faHome} /> Home
          </li>
          <li onClick={() => setSelectedOption('Explore')}>
            <FontAwesomeIcon icon={faHashtag} /> Explore
          </li>
          <li onClick={() => setSelectedOption('Notifications')}>
            <FontAwesomeIcon icon={faBell} /> Notifications
          </li>
          <li onClick={() => setSelectedOption('Messages')}>
            <FontAwesomeIcon icon={faEnvelope} /> Messages
          </li>
          <li onClick={() => setSelectedOption('Bookmarks')}>
            <FontAwesomeIcon icon={faBookmark} /> Bookmarks
          </li>
          <li onClick={() => setSelectedOption('Lists')}>
            <FontAwesomeIcon icon={faList} /> Lists
          </li>
          <li onClick={() => setSelectedOption('Profile')}>
            <FontAwesomeIcon icon={faUser} /> Profile
          </li>
          <li onClick={() => setSelectedOption('More')}>
            <FontAwesomeIcon icon={faEllipsisH} /> More
          </li>
        </ul>
      </div>
      <div className="main-content">
        <h2>{selectedOption}</h2>
        {renderContent()}
      </div>
      <div className="extra-content">
        <h2>Trending</h2>
        <div className="trends">
          <h3>Trends for you</h3>
          <ul>
            <li>#Trend1</li>
            <li>#Trend2</li>
            <li>#Trend3</li>
          </ul>
        </div>
        <div className="who-to-follow">
          <h3>Who to follow</h3>
          <ul>
            <li><FontAwesomeIcon icon={farUser} /> Leonardo DiCaprio</li>
            <li><FontAwesomeIcon icon={farUser} /> Taylor Swift</li>
            <li><FontAwesomeIcon icon={farUser} /> Elon Musk</li>
            <li><FontAwesomeIcon icon={farUser} /> Oprah Winfrey</li>
            <li><FontAwesomeIcon icon={farUser} /> Cristiano Ronaldo</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;