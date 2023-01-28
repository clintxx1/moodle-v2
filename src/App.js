import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import GuestLayout from './layout/guest';
import Home from './pages/home';
import Router from './router'

function App() {

  //TODO - fix routing
  const router = createBrowserRouter([
    {
      path: "/",
      element: <GuestLayout />,
      errorElement: <div>Error man kuno hehe</div>,
      children: [
        {
          path: "/home",
          element: <Home />,
          errorElement: <div>Error na liwat imo home hehe</div>
        }
      ]
    }
  ])


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
