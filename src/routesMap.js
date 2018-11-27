const mainRoutes = {
  HOME: {
    fileName: 'Home',
    route: {
      path: '/'
    }
  },
  PRODUCTS: {
    fileName: 'Products',
    route: {
      path: '/products'
    }
  },
  ABOUT: {
    fileName: 'About',
    route: {
      path: '/about'
    }
  }
}

const routesKeys = Object.keys(mainRoutes)
const routesValues = Object.values(mainRoutes)
export const pageReducer = {}
const routesMap = {}
routesKeys.forEach((route, index) => {
  routesMap[route] = routesValues[index].route
  pageReducer[route] = routesValues[index].fileName
})

export default routesMap