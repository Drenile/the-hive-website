import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Events from './pages/Events/Events';
import EventBooking from './pages/EventBooking/EventBooking';
import News from './pages/News/News';
import NewsArticle from './pages/NewsArticle/NewsArticle';
import FAQ from './pages/FAQ/FAQ';
import Contact from './pages/Contact/Contact';
import Projects from './pages/Projects/Projects';
import GetInvolved from './pages/GetInvolved/GetInvolved';
import HOTM from './pages/HOTM/HOTM';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import NotFound from './pages/NotFound/NotFound';
import Admin from './pages/Admin/Admin';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/"               element={<Home />} />
          <Route path="/about"          element={<About />} />
          <Route path="/events"         element={<Events />} />
          <Route path="/events/booking" element={<EventBooking />} />
          <Route path="/news"           element={<News />} />
          <Route path="/news/:id"       element={<NewsArticle />} />
          <Route path="/faq"            element={<FAQ />} />
          <Route path="/contact"        element={<Contact />} />
          <Route path="/projects"       element={<Projects />} />
          <Route path="/get-involved"   element={<GetInvolved />} />
          <Route path="/hotm"           element={<HOTM />} />
          <Route path="/login"          element={<Login />} />
          <Route path="/signup"         element={<Signup />} />
          <Route path="/admin"           element={<Admin />} />
          <Route path="*"               element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
