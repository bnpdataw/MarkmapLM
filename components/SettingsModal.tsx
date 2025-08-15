import React, { useState } from 'react';
import { IMarkmapJSONOptions } from '../types';
import { XIcon } from './icons';
import { useStore } from '../store/useStore';

interface SettingsModalProps {
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ onClose }) => {
  const { markmapOptions, customCss, apiKey, saveSettings } = useStore();

  const [optionsStr, setOptionsStr] = useState(JSON.stringify(markmapOptions, null, 2));
  const [css, setCss] = useState(customCss);
  const [key, setKey] = useState(apiKey);
  const [error, setError] = useState('');

  const handleSave = () => {
    try {
      const parsedOptions = JSON.parse(optionsStr);
      setError('');
      saveSettings(parsedOptions, css, key);
    } catch (e) {
      setError('Invalid JSON in options. Please correct it.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
          <h2 className="text-xl font-bold">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Gemini API Key
            </label>
            <input
              id="apiKey"
              type="password"
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 font-mono text-sm"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="Enter your Gemini API Key"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Your API key is stored locally in your browser's local storage.
            </p>
          </div>
          <div>
            <label htmlFor="options" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Markmap Options (JSON)
            </label>
            <textarea
              id="options"
              rows={10}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 font-mono text-sm"
              value={optionsStr}
              onChange={(e) => setOptionsStr(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
          <div>
            <label htmlFor="css" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Custom CSS
            </label>
            <textarea
              id="css"
              rows={8}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 font-mono text-sm"
              value={css}
              onChange={(e) => setCss(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end p-4 border-t dark:border-gray-700">
          <button onClick={onClose} className="px-4 py-2 mr-2 rounded-md text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500">
            Cancel
          </button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;