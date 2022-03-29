import React, { useEffect, useState } from 'react';
import { Uidcontext } from './components/appContext';
import Router from './components/routes';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';

const App = () => {
    const [uid, setUid] = useState(null);
    const dispatch = useDispatch();
    
    useEffect(() =>{
        const fetchToken = async () => {
          await axios({
              method : 'get',
              url : 'http://localhost:3000/jwtid',
              withCredentials : true,
          })
              .then((res) => setUid(res.data))
              .catch((err) => console.log("No token"));
        };
        fetchToken();

        if (uid){
          dispatch(getUser(uid))
        };
    }, [uid]);

    return (
      <Uidcontext.Provider value={uid}>
          <Router />
      </Uidcontext.Provider>
    );
};

export default App;