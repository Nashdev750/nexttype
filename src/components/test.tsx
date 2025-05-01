import React, { useState, useEffect, useRef } from 'react';
import { useSettings } from '../context/SettingsContext';
import { useTheme } from '../context/ThemeContext';
import TypingInterface from './TypingInterface';
import TypingStats from './TypingStats';
import SettingsPanel from './SettingsPanel';
import { Settings, Volume2, Volume, RotateCcw } from 'lucide-react';

const SpeedTypingTest: React.FC = () => {
  const { selectedText, selectedFont, soundEnabled } = useSettings();
  const { isDarkMode } = useTheme();
  
  const [isPaused, setIsPaused] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [characters, setCharacters] = useState<{ char: string; status: 'waiting' | 'correct' | 'incorrect' | 'current' }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [incorrectChars, setIncorrectChars] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const keyPressSound = useRef<HTMLAudioElement | null>(null);
  const errorSound = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    keyPressSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2513/2513-preview.mp3');
    keyPressSound.current.volume = 0.2;
    
    errorSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3');
    errorSound.current.volume = 0.2;
    
    return () => {
      keyPressSound.current = null;
      errorSound.current = null;
    };
  }, []);
  
  // Parse text into characters
  useEffect(() => {
    const chars = selectedText.content.split('').map(char => ({
      char,
      status: 'waiting' as const
    }));
    
    if (chars.length > 0) {
      chars[0].status = 'current';
    }
    
    setCharacters(chars);
    resetTest();
  }, [selectedText]);
  
  // Calculate WPM
  const calculateWPM = () => {
    if (!startTime) return 0;
    const timeInMinutes = elapsedTime / 60000;
    if (timeInMinutes === 0) return 0;
    
    // Standard WPM calculation (5 characters = 1 word)
    return Math.round(correctChars / 5 / timeInMinutes);
  };
  
  // Calculate accuracy
  const calculateAccuracy = () => {
    const totalTyped = correctChars + incorrectChars;
    if (totalTyped === 0) return 100;
    return Math.round((correctChars / totalTyped) * 100);
  };
  
  // Handle typing
  const handleKeyDown = (e: KeyboardEvent) => {
    if (isPaused) return;
    
    // Ignore modifier keys
    if (['Shift', 'Control', 'Alt', 'Meta', 'CapsLock', 'Tab'].includes(e.key)) {
      return;
    }
    
    // Start timer on first keypress
    if (!isActive) {
      setIsActive(true);
      setStartTime(Date.now() - elapsedTime);
    }
    
    if (currentIndex < characters.length) {
      const expectedChar = characters[currentIndex].char;
      const newCharacters = [...characters];
      
      if (e.key === expectedChar) {
        // Correct key
        newCharacters[currentIndex].status = 'correct';
        setCorrectChars(prev => prev + 1);
        
        if (soundEnabled && keyPressSound.current) {
          keyPressSound.current.currentTime = 0;
          keyPressSound.current.play().catch(() => {});
        }
      } else if (e.key === 'Backspace') {
        // Don't count backspace as an error
        return;
      } else {
        // Incorrect key
        newCharacters[currentIndex].status = 'incorrect';
        setIncorrectChars(prev => prev + 1);
        
        if (soundEnabled && errorSound.current) {
          errorSound.current.currentTime = 0;
          errorSound.current.play().catch(() => {});
        }
      }
      
      // Move to next character
      if (currentIndex + 1 < characters.length) {
        newCharacters[currentIndex + 1].status = 'current';
      }
      
      setCharacters(newCharacters);
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  // Update timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && !isPaused && startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else if (interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, isPaused, startTime]);
  
  // Pause test when focus is lost
  useEffect(() => {
    const handleFocusOut = () => {
      if (isActive && !isPaused) {
        setIsPaused(true);
      }
    };
    
    window.addEventListener('blur', handleFocusOut);
    document.addEventListener('click', (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        handleFocusOut();
      }
    });
    
    return () => {
      window.removeEventListener('blur', handleFocusOut);
    };
  }, [isActive, isPaused]);
  
  // Key events
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isPaused) {
        if (e.code === 'Space') {
          e.preventDefault();
          resumeTyping();
        }
        return;
      }
      handleKeyDown(e);
    };
    
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentIndex, characters, isActive, isPaused]);
  
  // Reset test
  const resetTest = () => {
    setIsActive(false);
    setIsPaused(false);
    setStartTime(null);
    setElapsedTime(0);
    setCurrentIndex(0);
    setCorrectChars(0);
    setIncorrectChars(0);
    
    const resetChars = selectedText.content.split('').map((char, index) => ({
      char,
      status: index === 0 ? 'current' : 'waiting'
    }));
    
    setCharacters(resetChars);
  };
  
  // Resume typing
  const resumeTyping = () => {
    if (isPaused) {
      setIsPaused(false);
      setStartTime(Date.now() - elapsedTime);
      if (containerRef.current) {
        containerRef.current.focus();
      }
    }
  };
  
  return (
    <div className="w-full max-w-3xl">
      <div className="mb-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
          >
            <Settings size={16} />
            <span>Settings</span>
          </button>
          
          <button 
            onClick={() => resetTest()} 
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500 transition-colors"
          >
            <RotateCcw size={16} />
            <span>Restart</span>
          </button>
        </div>
        
        <div className="flex items-center">
          <button 
            onClick={useSettings().toggleSound}
            className="p-2 rounded-md hover:bg-gray-800 transition-colors"
            title={soundEnabled ? "Sound On" : "Sound Off"}
          >
            {soundEnabled ? <Volume2 size={20} /> : <Volume size={20} className="text-gray-500" />}
          </button>
        </div>
      </div>
      
      {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
      
      <TypingStats wpm={calculateWPM()} accuracy={calculateAccuracy()} />
      
      <div 
        ref={containerRef}
        className="relative mt-6 p-6 bg-gray-800 rounded-lg shadow-lg outline-none"
        tabIndex={0}
        onClick={resumeTyping}
      >
        <TypingInterface 
          characters={characters} 
          fontFamily={selectedFont.value}
          isPaused={isPaused}
          currentIndex={currentIndex}
        />
        
        {isPaused && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
            <div className="text-center">
              <button
                onClick={resumeTyping}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full text-lg font-medium transition-all transform hover:scale-105"
              >
                Resume Typing
              </button>
              <p className="mt-2 text-sm text-gray-400">Press space to resume</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpeedTypingTest;