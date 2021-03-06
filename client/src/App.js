import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Swal from 'sweetalert2';
import Navbar from './components/Navbar/Navbar';
import LogoutPage from './pages/LogoutPage';
import LatestNews from './pages/LatestNewsPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import AuthContextProvider from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import ProductsPage from './pages/ProductsPage';
import KitchenPage from './pages/KitchenPage';
import AboutPage from './pages/AboutPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';
import MenuPage from './pages/MenuPage';
import CodePage from './pages/CodePage';
import SingleNewsPage from './pages/SingleNewsPage';

// TODO: import footer
// import Footer from './components/Footer';

window.swal = Swal;

const App = () => (
  <div className="App">
    <AuthContextProvider>
      <Router>
        <Navbar />
        <div className="container mt-4">
          <Switch>
            <Route exact path="/" component={LatestNews} />
            <Route exact path="/news/:id" component={SingleNewsPage} />

            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={LoginPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/gallery" component={GalleryPage} />
            <PrivateRoute path="/products" component={ProductsPage} />
            <PrivateRoute path="/logout" component={LogoutPage} />
            <PrivateRoute path="/kitchen" component={KitchenPage} />
            <AdminRoute path="/admin" component={AdminPage} />
            <AdminRoute path="/menu" component={MenuPage} />
            <AdminRoute path="/codes" component={CodePage} />
          </Switch>
        </div>
      </Router>
      {/* <Footer /> */}
    </AuthContextProvider>
  </div>
);

export default App;
