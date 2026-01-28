import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTheme } from '../contexts/ThemeContext';

const FloatingEditor = ({
    isOpen,
    onClose,
    onApply,
    currentField,
    currentValue = '',
    position = 'top' // 'top', 'right', 'left'
}) => {
    const { isDark } = useTheme();
    const [editorState, setEditorState] = useState(() => {
        if (currentValue) {
            try {
                const contentBlocks = htmlToDraft(currentValue);
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(contentBlocks.contentBlocks)
                );
            } catch (error) {
                return EditorState.createEmpty();
            }
        }
        return EditorState.createEmpty();
    });

    const [wordCount, setWordCount] = useState(0);

    // Update editor when currentValue changes
    useEffect(() => {
        if (currentValue !== draftToHtml(convertToRaw(editorState.getCurrentContent()))) {
            try {
                const contentBlocks = htmlToDraft(currentValue || '');
                const newEditorState = EditorState.createWithContent(
                    ContentState.createFromBlockArray(contentBlocks.contentBlocks)
                );
                setEditorState(newEditorState);
            } catch (error) {
                setEditorState(EditorState.createEmpty());
            }
        }
    }, [currentValue]);

    const updateWordCount = (editorState) => {
        const plainText = editorState.getCurrentContent().getPlainText('\n');
        const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
        setWordCount(words);
    };

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        updateWordCount(newEditorState);
    };

    const handleApply = () => {
        const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        onApply(htmlContent);
        onClose();
    };

    const handleClear = () => {
        setEditorState(EditorState.createEmpty());
        setWordCount(0);
    };
    // Simplified toolbar config
    const toolbarConfig = {
        options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
        inline: {
            options: ['bold', 'italic', 'underline', 'strikethrough'],
        },
        blockType: {
            inDropdown: true,
            options: ['Normal', 'H1', 'H2', 'H3', 'Blockquote'],
        },
        fontSize: {
            options: [12, 14, 16, 18, 20, 24, 28],
        },
        list: {
            options: ['unordered', 'ordered'],
        },
        textAlign: {
            inDropdown: true,
            options: ['left', 'center', 'right'],
        },
        colorPicker: {
            colors: [
                'rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(239,68,68)', 'rgb(34,197,94)',
                'rgb(59,130,246)', 'rgb(147,51,234)', 'rgb(251,146,60)', 'rgb(252,211,77)',
                'rgb(55,65,81)', 'rgb(107,114,128)', 'rgb(156,163,175)', 'rgb(209,213,219)'
            ],
        },
        link: {
            inDropdown: false,
            options: ['link', 'unlink'],
        },
        history: {
            options: ['undo', 'redo'],
        }
    };

    // Position styles
    const getPositionStyles = () => {
        switch (position) {
            case 'right':
                return 'fixed top-4 right-4 w-96 h-[calc(100vh-2rem)]';
            case 'left':
                return 'fixed top-4 left-4 w-96 h-[calc(100vh-2rem)]';
            default: // top
                return 'fixed top-4 left-1/2 transform -translate-x-1/2 w-[90vw] max-w-4xl h-[70vh]';
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />

            {/* Floating Editor */}
            <div className={`${getPositionStyles()} z-50 ${isDark ? 'dark' : ''}`}>
                <div className={`h-full rounded-xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800 border border-gray-600' : 'bg-white border border-gray-200'
                    }`}>

                    {/* Header */}
                    <div className={`px-4 py-3 border-b flex justify-between items-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                        }`}>
                        <div>
                            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                                Rich Text Editor
                            </h3>
                            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                Editing: {currentField || 'Content'}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className={`p-2 rounded-lg hover:bg-opacity-80 transition-colors ${isDark ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'
                                }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Editor */}
                    <div className="flex-1 overflow-hidden">
                        <Editor
                            editorState={editorState}
                            onEditorStateChange={handleEditorStateChange}
                            wrapperClassName="h-full flex flex-col"
                            toolbarClassName={`rdw-editor-toolbar ${isDark ? 'rdw-editor-toolbar-dark' : ''} border-b ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                                }`}
                            editorClassName="flex-1 overflow-auto"
                            editorStyle={{
                                padding: '16px 20px',
                                fontSize: '15px',
                                lineHeight: '1.6',
                                color: isDark ? '#f9fafb' : '#111827',
                                backgroundColor: isDark ? '#374151' : '#ffffff',
                                fontFamily: "'Inter', system-ui, sans-serif",
                                minHeight: '200px'
                            }}
                            toolbar={toolbarConfig}
                            placeholder={`Enter ${currentField?.toLowerCase() || 'content'}...`}
                        />
                    </div>

                    {/* Footer */}
                    <div className={`px-4 py-3 border-t flex justify-between items-center ${isDark ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-gray-50'
                        }`}>
                        <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {wordCount} words
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={handleClear}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${isDark
                                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                            >
                                Clear
                            </button>
                            <button
                                onClick={onClose}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${isDark
                                    ? 'bg-gray-600 hover:bg-gray-500 text-gray-200'
                                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                                    }`}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleApply}
                                className="px-4 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Apply
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FloatingEditor;