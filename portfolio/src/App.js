import {Route , BrowserRouter} from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import './stylesheets/home.css'
import './stylesheets/header-footer.css'
import './stylesheets/carousel.css'
import './stylesheets/projects.css'
import Footer from './components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration:500
});
function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Route path='/' exact component={Home}/>
          <Route path='/projects' exact component={Projects}/>
          <Route path='/contact' exact component={Contact}/>
        </BrowserRouter>

        <Footer/>

      </div>
  );
}

export default App;
