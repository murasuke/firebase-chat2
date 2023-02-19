import { Routes, Route, Navigate } from 'react-router-dom';
import ChatPage from './ChatPage';

const App = () => (
  <div className="App">
    <Routes>
      <Route path="/chat/:room" element={<ChatPage />} />
      <Route path="*" element={<Navigate replace to="/chat/room1" />} />
    </Routes>
  </div>
);
export default App;
