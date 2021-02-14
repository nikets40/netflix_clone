import './App.css';
import Banner from './components/Banner';
import Nav from './components/Nav';
import Content from './components/Content';

function App() {
  return (
    <div className="App">
        <Nav/>
        <Banner/>
        <Content/>
    </div>
  );
}

export default App;
