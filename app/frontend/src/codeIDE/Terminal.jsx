import React from 'react';

const Terminal = ({ output, error }) => {
    const terminalStyle = {
        border: '1px solid #333',
        borderRadius: '4px',
        overflow: 'hidden',
        marginTop: '20px',
        fontFamily: 'monospace',
        backgroundColor: '#000',
        color: '#fff',
    };

    const headerStyle = {
        backgroundColor: '#333',
        color: '#fff',
        padding: '8px',
        fontFamily: 'monospace',
    };

    const bodyStyle = {
        padding: '12px',
        whiteSpace: 'pre-wrap', // Preserve line breaks
        fontFamily: 'monospace',
    };

    const errorStyle = {
        color: 'red',
        fontWeight: 'bold',
        fontFamily: 'monospace',
    };

    const outputStyle = {
        color: '#fff',
        fontFamily: 'monospace',
    };

    return (
        <div style={terminalStyle}>
            <div style={headerStyle}>Terminal</div>
            <div style={bodyStyle}>
                {error && (
                    <div style={errorStyle}>
                        <span>Error:</span> {error}
                    </div>
                )}
                {output && (
                    <div style={outputStyle}>
                        <span></span> {output}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Terminal;
