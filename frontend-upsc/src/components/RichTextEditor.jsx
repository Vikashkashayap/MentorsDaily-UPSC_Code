import { useState, useEffect } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useTheme } from '../contexts/ThemeContext';

const RichTextEditor = ({
    value = '',
    onChange,
    placeholder = 'Start typing...',
    minHeight = 150,
    maxHeight = 400,
    label,
    required = false,
    className = '',
    toolbarConfig = 'full', // 'basic', 'standard', 'full'
    showWordCount = true,
    showCharCount = false,
    disabled = false
}) => {
    const { isDark } = useTheme();
    const [editorState, setEditorState] = useState(() => {
        if (value) {
            try {
                const contentBlocks = htmlToDraft(value);
                return EditorState.createWithContent(
                    ContentState.createFromBlockArray(contentBlocks.contentBlocks)
                );
            } catch (error) {
                console.warn('Error parsing HTML content:', error);
                return EditorState.createEmpty();
            }
        }
        return EditorState.createEmpty();
    });

    const [wordCount, setWordCount] = useState(0);
    const [charCount, setCharCount] = useState(0);

    // Update editor state when value prop changes
    useEffect(() => {
        if (value !== draftToHtml(convertToRaw(editorState.getCurrentContent()))) {
            try {
                const contentBlocks = htmlToDraft(value || '');
                const newEditorState = EditorState.createWithContent(
                    ContentState.createFromBlockArray(contentBlocks.contentBlocks)
                );
                setEditorState(newEditorState);
            } catch (error) {
                console.warn('Error updating editor state:', error);
            }
        }
    }, [value]);

    // Calculate word and character counts
    const updateCounts = (editorState) => {
        const plainText = editorState.getCurrentContent().getPlainText('\n');
        const words = plainText.trim() ? plainText.trim().split(/\s+/).length : 0;
        const chars = plainText.length;
        setWordCount(words);
        setCharCount(chars);
    };

    const handleEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const htmlContent = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
        updateCounts(newEditorState);

        if (onChange) {
            onChange(htmlContent);
        }
    };

    // Toolbar configurations
    const getToolbarConfig = () => {
        const baseConfig = {
            options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history'],
            inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                bold: { className: 'rdw-option-wrapper' },
                italic: { className: 'rdw-option-wrapper' },
                underline: { className: 'rdw-option-wrapper' },
                strikethrough: { className: 'rdw-option-wrapper' }
            },
            blockType: {
                inDropdown: true,
                options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                className: 'rdw-block-wrapper',
                dropdownClassName: 'rdw-block-dropdown'
            },
            fontSize: {
                options: [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 60, 72],
                className: 'rdw-fontsize-wrapper',
                dropdownClassName: 'rdw-fontsize-dropdown'
            },
            fontFamily: {
                options: [
                    'Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana',
                    'Helvetica', 'Courier New', 'Comic Sans MS', 'Trebuchet MS', 'Palatino'
                ],
                className: 'rdw-fontfamily-wrapper',
                dropdownClassName: 'rdw-fontfamily-dropdown'
            },
            list: {
                options: ['unordered', 'ordered', 'indent', 'outdent'],
                unordered: { className: 'rdw-option-wrapper' },
                ordered: { className: 'rdw-option-wrapper' },
                indent: { className: 'rdw-option-wrapper' },
                outdent: { className: 'rdw-option-wrapper' }
            },
            textAlign: {
                inDropdown: true,
                options: ['left', 'center', 'right', 'justify'],
                className: 'rdw-text-align-wrapper',
                dropdownClassName: 'rdw-text-align-dropdown'
            },
            colorPicker: {
                colors: [
                    // Basic Colors - Text
                    'rgb(0,0,0)', 'rgb(255,255,255)', 'rgb(239,68,68)', 'rgb(34,197,94)',
                    'rgb(59,130,246)', 'rgb(147,51,234)', 'rgb(251,146,60)', 'rgb(252,211,77)',
                    // Gray Scale
                    'rgb(55,65,81)', 'rgb(107,114,128)', 'rgb(156,163,175)', 'rgb(209,213,219)'
                ],
                className: 'rdw-colorpicker-wrapper',
                component: undefined,
                popupClassName: 'rdw-colorpicker-popup'
            },
            link: {
                inDropdown: false,
                showOpenOptionOnHover: true,
                defaultTargetOption: '_self',
                options: ['link', 'unlink'],
                className: 'rdw-link-wrapper'
            },
            emoji: {
                className: 'rdw-emoji-wrapper',
                emojis: [
                    'ðŸ˜€', 'ðŸ˜', 'ðŸ˜‚', 'ðŸ¤£', 'ðŸ˜ƒ', 'ðŸ˜„', 'ðŸ˜…', 'ðŸ˜†', 'ðŸ˜‰', 'ðŸ˜Š', 'ðŸ˜‹', 'ðŸ˜Ž', 'ðŸ˜', 'ðŸ˜˜',
                    'ðŸ¥°', 'ðŸ˜—', 'ðŸ˜™', 'ðŸ˜š', 'ðŸ™‚', 'ðŸ¤—', 'ðŸ¤©', 'ðŸ¤”', 'ðŸ¤¨', 'ðŸ˜', 'ðŸ˜‘', 'ðŸ˜¶', 'ðŸ™„', 'ðŸ˜',
                    'ðŸ˜£', 'ðŸ˜¥', 'ðŸ˜®', 'ðŸ¤', 'ðŸ˜¯', 'ðŸ˜ª', 'ðŸ˜«', 'ðŸ¥±', 'ðŸ˜´', 'ðŸ˜Œ', 'ðŸ˜›', 'ðŸ˜œ', 'ðŸ˜', 'ðŸ¤¤',
                    'ðŸ˜’', 'ðŸ˜“', 'ðŸ˜”', 'ðŸ˜•', 'ðŸ™ƒ', 'ðŸ¤‘', 'ðŸ˜²', 'â˜¹ï¸', 'ðŸ™', 'ðŸ˜–', 'ðŸ˜ž', 'ðŸ˜Ÿ', 'ðŸ˜¤', 'ðŸ˜¢',
                    'ðŸ˜­', 'ðŸ˜¦', 'ðŸ˜§', 'ðŸ˜¨', 'ðŸ˜©', 'ðŸ¤¯', 'ðŸ˜¬', 'ðŸ˜°', 'ðŸ˜±', 'ðŸ¥µ', 'ðŸ¥¶', 'ðŸ˜³', 'ðŸ¤ª', 'ðŸ˜µ',
                    'ðŸ¥´', 'ðŸ˜ ', 'ðŸ˜¡', 'ðŸ¤¬', 'ðŸ˜·', 'ðŸ¤’', 'ðŸ¤•', 'ðŸ¤¢', 'ðŸ¤®', 'ðŸ¤§', 'ðŸ˜‡', 'ðŸ¥³', 'ðŸ¥º', 'ðŸ¤ '
                ]
            },
            history: {
                inDropdown: false,
                options: ['undo', 'redo'],
                className: 'rdw-history-wrapper'
            }
        };

        // Add advanced features for full config
        if (toolbarConfig === 'full') {
            baseConfig.options.push('embedded', 'image', 'remove');
            baseConfig.embedded = {
                className: 'rdw-embedded-wrapper',
                defaultSize: {
                    height: 'auto',
                    width: 'auto',
                },
            };
            baseConfig.image = {
                className: 'rdw-image-wrapper',
                uploadCallback: undefined,
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: { present: false, mandatory: false },
                defaultSize: {
                    height: 'auto',
                    width: 'auto',
                },
            };
            baseConfig.remove = {
                className: 'rdw-remove-wrapper'
            };
        }

        // Simplified config for basic
        if (toolbarConfig === 'basic') {
            baseConfig.options = ['inline', 'list', 'textAlign', 'link', 'history'];
        }

        // Standard config (removes some advanced features)
        if (toolbarConfig === 'standard') {
            baseConfig.options = ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'history'];
        }

        return baseConfig;
    };

    return (
        <div className={`${isDark ? 'dark' : ''} ${className} w-full`}>
            {label && (
                <label className={`block text-sm font-semibold mb-3 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div className={`relative rounded-xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-xl ${isDark
                ? 'border-2 border-gray-600 bg-gray-800 focus-within:border-blue-400 focus-within:ring-4 focus-within:ring-blue-400/10'
                : 'border-2 border-gray-200 bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10'
                } ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}>

                {/* Enhanced Toolbar */}
                <div className={`border-b transition-colors duration-200 ${isDark
                    ? 'border-gray-600 bg-gradient-to-r from-gray-700 to-gray-800'
                    : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'
                    } px-4 py-3`}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorStateChange}
                        wrapperClassName="rdw-editor-wrapper"
                        toolbarClassName={`rdw-editor-toolbar ${isDark ? 'rdw-editor-toolbar-dark' : ''}`}
                        editorClassName="rdw-editor-main"
                        readOnly={disabled}
                        editorStyle={{
                            minHeight: `${minHeight}px`,
                            maxHeight: `${maxHeight}px`,
                            overflowY: 'auto',
                            padding: '16px 20px',
                            fontSize: '15px',
                            lineHeight: '1.7',
                            color: isDark ? '#f9fafb' : '#111827',
                            backgroundColor: isDark ? '#374151' : '#ffffff',
                            fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif"
                        }}
                        toolbar={getToolbarConfig()}
                        placeholder={placeholder}
                        stripPastedStyles={false}
                        handlePastedText={() => false}
                        ariaLabel={label || 'Rich text editor'}
                    />
                </div>

                {/* Enhanced Status Bar */}
                {(showWordCount || showCharCount) && (
                    <div className={`px-4 py-3 text-sm flex justify-between items-center border-t transition-colors duration-200 ${isDark
                        ? 'border-gray-600 bg-gradient-to-r from-gray-800 to-gray-700 text-gray-300'
                        : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white text-gray-600'
                        }`}>
                        <div className="flex space-x-6">
                            {showWordCount && (
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span className="font-medium">{wordCount}</span>
                                    <span className="opacity-75">words</span>
                                </div>
                            )}
                            {showCharCount && (
                                <div className="flex items-center space-x-1">
                                    <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                                    </svg>
                                    <span className="font-medium">{charCount}</span>
                                    <span className="opacity-75">chars</span>
                                </div>
                            )}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full ${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                            }`}>
                            {toolbarConfig === 'full' ? 'ðŸš€ Full' : toolbarConfig === 'standard' ? 'âš¡ Standard' : 'ðŸ“ Basic'}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RichTextEditor;
