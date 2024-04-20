import { useState,useEffect } from 'react'

import CustomEditor from './codeIDE/CustomEditor';
import Avatar from './avatar';


const App = () => {
    
    return (<>
    
         <CustomEditor />
         <Avatar />
      
        </>
    );
};

export default App;