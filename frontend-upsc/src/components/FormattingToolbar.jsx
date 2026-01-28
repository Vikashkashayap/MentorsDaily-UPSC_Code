import { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const FormattingToolbar = ({ activeField, getFieldLabel }) => {
  const { isDark } = useTheme();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [colorMode, setColorMode] = useState('text');

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    const activeElement = document.querySelector(`[data-field-name="${activeField}"]`);
    if (activeElement) {
      activeElement.dispatchEvent(new Event('input', { bubbles: true }));
    }
  };

  const toggleHeading = (tag) => {
    const activeElement = document.querySelector(`[data-field-name="${activeField}"]`);
    if (!activeElement) return;

    activeElement.focus();

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString();
    
    if (!selectedText) return;

    let element = range.commonAncestorContainer;
    
    // Get the parent element if it's a text node
    if (element.nodeType === 3) {
      element = element.parentElement;
    }

    // Find the closest block-level element
    let blockElement = element;
    while (blockElement && blockElement !== activeElement) {
      const tagName = blockElement.tagName;
      if (tagName && ['H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'P', 'DIV'].includes(tagName)) {
        break;
      }
      blockElement = blockElement.parentElement;
    }

    // If we found a block element and it's not the container itself
    if (blockElement && blockElement !== activeElement && blockElement.tagName) {
      const currentTag = blockElement.tagName.toLowerCase();
      const newTag = (currentTag === tag) ? 'p' : tag;
      
      // Create new element
      const newElement = document.createElement(newTag);
      newElement.innerHTML = blockElement.innerHTML;
      
      // Replace
      blockElement.parentNode.replaceChild(newElement, blockElement);
      
      // Restore selection
      const newRange = document.createRange();
      newRange.selectNodeContents(newElement);
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      // No block element found, wrap selection in new tag
      const newElement = document.createElement(tag === 'p' ? 'p' : tag);
      newElement.textContent = selectedText;
      
      range.deleteContents();
      range.insertNode(newElement);
      
      // Select the new element
      const newRange = document.createRange();
      newRange.selectNodeContents(newElement);
      selection.removeAllRanges();
      selection.addRange(newRange);
    }
    
    // Trigger input event
    activeElement.dispatchEvent(new Event('input', { bubbles: true }));
  };

  const colors = [
    '#000000', '#434343', '#666666', '#999999', '#cccccc', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff',
    '#4a86e8', '#0000ff', '#9900ff', '#ff00ff', '#e6b8af', '#f4cccc'
  ];

  return (
    <div className={`sticky top-6 p-4 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-md max-h-[85vh] overflow-y-auto`}>
      {/* Header */}
      <div className="mb-4 pb-3 border-b border-gray-600">
        <h3 className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Rich Text Editor
        </h3>
        <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
          {getFieldLabel ? getFieldLabel(activeField) : activeField}
        </p>
      </div>

      {/* Basic Formatting */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-2">
          <button type="button" onClick={() => formatText('bold')} className={`p-2 rounded font-bold ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Bold">B</button>
          <button type="button" onClick={() => formatText('italic')} className={`p-2 rounded italic ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Italic">I</button>
          <button type="button" onClick={() => formatText('underline')} className={`p-2 rounded underline ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Underline">U</button>
          <button type="button" onClick={() => formatText('strikeThrough')} className={`p-2 rounded line-through ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Strike">S</button>
        </div>

        {/* Lists */}
        <div className="grid grid-cols-2 gap-2">
          <button type="button" onClick={() => formatText('insertOrderedList')} className={`p-2 rounded text-sm ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>1. List</button>
          <button type="button" onClick={() => formatText('insertUnorderedList')} className={`p-2 rounded text-sm ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>• List</button>
        </div>

        {/* Colors */}
        <div>
          <div className="flex gap-1 mb-2">
            <button onClick={() => setColorMode('text')} className={`flex-1 px-2 py-1 text-xs rounded ${colorMode === 'text' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>Text</button>
            <button onClick={() => setColorMode('background')} className={`flex-1 px-2 py-1 text-xs rounded ${colorMode === 'background' ? 'bg-blue-600 text-white' : isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>Highlight</button>
          </div>
          <div className="grid grid-cols-6 gap-1">
            {colors.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => formatText(colorMode === 'text' ? 'foreColor' : 'backColor', color)}
                className="w-full h-8 rounded border border-gray-300 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Advanced Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`w-full p-2 rounded text-sm font-medium ${isDark ? 'bg-blue-600 hover:bg-blue-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {showAdvanced ? '▲ Less' : '▼ More Options'}
        </button>

        {/* Advanced Options */}
        {showAdvanced && (
          <div className="space-y-3 pt-2">
            {/* Headings */}
            <div>
              <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Headings (Click again to remove)</p>
              <div className="grid grid-cols-4 gap-2">
                <button type="button" onClick={() => toggleHeading('h1')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Toggle H1">H1</button>
                <button type="button" onClick={() => toggleHeading('h2')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Toggle H2">H2</button>
                <button type="button" onClick={() => toggleHeading('h3')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`} title="Toggle H3">H3</button>
                <button type="button" onClick={() => toggleHeading('p')} className={`p-2 rounded text-xs ${isDark ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'}`} title="Remove Heading">Clear</button>
              </div>
            </div>

            {/* Alignment */}
            <div>
              <p className={`text-xs font-semibold mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>Align</p>
              <div className="grid grid-cols-3 gap-2">
                <button type="button" onClick={() => formatText('justifyLeft')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>⬅ Left</button>
                <button type="button" onClick={() => formatText('justifyCenter')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>↔ Center</button>
                <button type="button" onClick={() => formatText('justifyRight')} className={`p-2 rounded text-xs ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>➡ Right</button>
              </div>
            </div>

            {/* Clear Format */}
            <button type="button" onClick={() => formatText('removeFormat')} className={`w-full p-2 rounded text-sm ${isDark ? 'bg-red-600 hover:bg-red-500 text-white' : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'}`}>
              Clear Formatting
            </button>
          </div>
        )}
      </div>

      {/* Shortcuts */}
      <div className={`mt-4 pt-3 border-t border-gray-600 text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
        <p className="font-semibold mb-1">Shortcuts:</p>
        <p>Ctrl+B = Bold | Ctrl+I = Italic | Ctrl+U = Underline</p>
      </div>
    </div>
  );
};

export default FormattingToolbar;
