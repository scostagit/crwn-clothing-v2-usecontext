import { createContext, useState, useEffect } from 'react';


import { 
    //addCollectionAndDocuments,
    getCategoriesAndDocuments
 } from '../utils/firebase/firebase.utils';


//import SHOP_DATA from '../shop-data.js';

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

   useEffect(() => { 

    //this is the bast way to use asyn function inside useEffect hooks
    // it is a best practice each useEffect has single responsibility,
    // each useEffect has one reason and only reason to exists, you can create
    // many of them.
        const getCategoriesMap = async()=>{           
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);
        };

        getCategoriesMap();
  },[]);
  /*useEffect(() => { 
    addCollectionAndDocuments('categories', SHOP_DATA);
  }, []);*/

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};