import { useState,useEffect } from 'react'


import CodeEditor from './CodeEditor';
import Terminal from './Terminal';

const CustomEditor = () => {
    const [code, setCode] = useState('');
    const [output, setOutput] = useState(null);
    const [line, setline] = useState(null);
    const [yes, setYes] = useState(1);
    const [error, setError] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState('python');
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    const extractLineNumber = (str) => {
        const match = str.match(/line (\d+)/);
        if (match && match[1]) {
            return parseInt(match[1], 10);
        } else {
            return null; 
        }
    };

    
    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
        setCode('');
        setline();
        setYes(yes+1);
    };
    const handleRunCode = () => {

        if (selectedLanguage==="python"||selectedLanguage==="c"){

        fetch('http://localhost:5000/runcode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ language: selectedLanguage, code }) 
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                setError(data.error);
                let place_holder = data.error;
            
                let lineNumber = extractLineNumber(data.error);
                if (selectedLanguage==="c"){
                    lineNumber = parseInt(place_holder.split('\n')[1].match(/\d+/)[0], 10);
                  
                   
                }
                    setYes(yes+1);
                    setline(lineNumber);
                
               
                setOutput(null);
            } else {
                setError(null);
                setOutput(data.output);
                console.log("data",data.output)
            }
        })
        .catch(error => {
            setError('An error occurred while processing the request.');
            setOutput(null);
        })}
        else{
            try {
                function result(){return eval(code);}
             
                setOutput(result());
            } catch (error) {
            
                setError(error.message);
                const lineNumber = extractLineNumber(error.stack);
                setLine(lineNumber);
            }
        }
        
    };
    return (<>
    
        <div>
        <select
    value={selectedLanguage}
    onChange={handleLanguageChange}
    style={{ padding: '5px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}
>
    <option value="python" style={{ backgroundColor: 'white' }}>Python</option>
    <option value="c" style={{ backgroundColor: 'white' }}>C</option>
    <option value="javascript" style={{ backgroundColor: 'white' }}>JavaScript</option>
</select>
           < CodeEditor value={code} onChange={handleCodeChange} highlightedLine={line} condition={yes}/>
           <button
    onClick={handleRunCode}
    style={{
        backgroundColor: '#4CAF50', /* Green */
        border: 'none',
        color: 'white',
        padding: '10px 20px',
        textAlign: 'center',
        textDecoration: 'none',
        display: 'inline-block',
        fontSize: '16px',
        borderRadius: '5px',
        cursor: 'pointer',
    }}
>
    Run Code
</button>
            <Terminal output={output} error={error} />
        </div>
        </>
    );
};

export default CustomEditor;