import { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const RichTextField = ({
  name,
  value = '',
  onChange,
  onFocus,
  placeholder = '',
  className = '',
  isActive = false,
  multiline = false,
  rows = 1
}) => {
  const { isDark } = useTheme();
  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current && value !== editorRef.current.innerHTML) {
      editorRef.current.innerHTML = value || '';
      // Auto-expand on content change
      if (multiline) {
        autoExpand();
      }
    }
  }, [value]);

  // Auto-expand function
  const autoExpand = () => {
    if (editorRef.current && multiline) {
      editorRef.current.style.height = 'auto';
      editorRef.current.style.height = editorRef.current.scrollHeight + 'px';
    }
  };

  const handleInput = (e) => {
    const htmlContent = e.target.innerHTML;
    onChange(name, htmlContent);
    // Auto-expand on input
    if (multiline) {
      autoExpand();
    }
  };

  // Handle paste to preserve formatting
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData('text/html') || 
                  (e.clipboardData || window.clipboardData).getData('text');
    
    if (paste) {
      document.execCommand('insertHTML', false, paste);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    onFocus(name);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (e) => {
    // Allow basic keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          document.execCommand('bold');
          break;
        case 'i':
          e.preventDefault();
          document.execCommand('italic');
          break;
        case 'u':
          e.preventDefault();
          document.execCommand('underline');
          break;
        default:
          break;
      }
    }
    
    // Handle Enter key for single-line fields
    if (!multiline && e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div
      ref={editorRef}
      contentEditable
      onInput={handleInput}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      data-field-name={name}
      className={`
        ${className}
        ${isActive ? 'ring-2 ring-blue-500 border-blue-500' : 'focus:ring-blue-500 focus:border-transparent'}
        ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}
        ${!multiline ? 'single-line' : ''}
        w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition-colors
        ${multiline ? 'min-h-[100px] overflow-y-hidden' : 'min-h-[48px] max-h-[48px] overflow-hidden'}
      `}
      style={{
        fontSize: '15px',
        lineHeight: multiline ? '1.6' : '1.2',
        fontFamily: "'Inter', system-ui, sans-serif",
        resize: 'none',
        overflow: multiline ? 'hidden' : 'hidden'
      }}
      data-placeholder={!value ? placeholder : ''}
      suppressContentEditableWarning={true}
    />
  );
};

export default RichTextField;