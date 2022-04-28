import * as React from 'react';

function get(set){
    const requestOptions = {
      method: 'GET',
    };
    fetch('http://10.0.0.171:5000/wardrobe',requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw response;
        }
        
        return response.json();
        
      })
      .then((json)=> {
        set(json);
      })
  }
  
function Wardrobe(){
  const [wd,setWd] = React.useState({})
  React.useEffect(()=> {
   get(setWd);
  },[]);
  return wd;
}

export default Wardrobe;