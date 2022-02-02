import './App.css';
import MessageList from './components/MessageList';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="App">
      <Toolbar />
      <MessageList />
    </div>
  );
}

export default App;
