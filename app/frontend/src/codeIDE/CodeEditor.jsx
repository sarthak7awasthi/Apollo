
import React, { useRef, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';
import './styles.css';


const CodeEditor = ({ value, onChange, highlightedLine, condition }) => {
    const editorRef = useRef();
 

    useEffect(() => {
        if (editorRef.current) {
            const model = editorRef.current.getModel();
            if (highlightedLine) {
                const range = {
                    startLineNumber: highlightedLine,
                    startColumn: 1,
                    endLineNumber: highlightedLine,
                    endColumn: model.getLineMaxColumn(highlightedLine),
                };
                editorRef.current.deltaDecorations([], [
                    { range: range, options: { isWholeLine: true, className: 'highlight-line' } },
                ]);
            } else {
                // Unhighlighting the existing highlighted line or resetting
                const decorations = editorRef.current.getLineDecorations();
                const highlightedDecorations = decorations.filter(decoration => decoration.options.className === 'highlight-line');
                editorRef.current.deltaDecorations(
                    highlightedDecorations.map(decoration => decoration.id),
                    []
                );
            }
        }
    }, [highlightedLine]);

    const options = {
        selectOnLineNumbers: true,
        automaticLayout: true,
        fontSize: 14,
        minimap: {
            enabled: false,
        },
    };

    return (
        <MonacoEditor
        width="800"
        height="600"
            language="c"
            theme="vs-dark"
            value={value}
            options={options}
            onChange={onChange}
            editorDidMount={editor => (editorRef.current = editor)}
        />
    );
};

export default CodeEditor;
