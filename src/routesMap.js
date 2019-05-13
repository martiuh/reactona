import { HomeThunk } from './routeThunks';

const mainRoutes = {
  HOME: {
    fileName: 'Home',
    route: {
      path: '/',
      thunk: HomeThunk
    }
  },
  PRODUCTS: {
    fileName: 'Products',
    route: {
      path: '/productos'
    }
  },
  ABOUT: {
    fileName: 'About',
    route: {
      path: '/about'
    }
  }
};

const routesKeys = Object.keys(mainRoutes);
const routesValues = Object.values(mainRoutes);
export const pageReducer = {};
const routesMap = {};
routesKeys.forEach((route, index) => {
  const currentRoute = routesValues[index];
  if (currentRoute.route) {
    routesMap[route] = currentRoute.route;
  }
  pageReducer[route] = currentRoute.fileName;
});

export default routesMap;
