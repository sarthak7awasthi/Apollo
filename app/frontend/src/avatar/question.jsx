import React, { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceRecognition = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = true;
        recognition.maxAlternatives = 1;

        recognition.onresult = (event) => {
            const last = event.results.length - 1;
            const text = event.results[last][0].transcript;
            console.log('Text: ' + text);
            console.log('Confidence: ' + event.results[0][0].confidence);
            
            if (text.toLowerCase().includes('question')){
                console.log('Hello');
                setMessage('Hello');
            }
        };

        recognition.onspeechend = () => {
            recognition.stop();
        };

        recognition.onerror = (event) => {
            console.log('Error occurred in recognition: ' + event.error);
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, []);

    return (
        <div>
            <p>Microphone: {message}</p>
        </div>
    );
};

export default VoiceRecognition;
