"use client"
import React, { useEffect, useState } from 'react';
import { Command, Timer, Keyboard, Settings, Globe } from 'lucide-react';
import { TypingTest } from '../components/TypingTest';
import { Header } from '../components/Header';
import { Dropdown } from '../components/Dropdown';
import { Leaderboard } from '../components/Leaderboard';
import { useTimer } from '../hooks/useTimer';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { base_url, challenges } from '../constants/utils';
import { LanguageSelect } from '../components/LanguageSelect';

import { Helmet } from 'react-helmet';
import Blog from '@/components/Blog';
import Head from 'next/head';
import { LoginReminder } from '@/components/LoginReminder';

const times = ['15', '30', '60', '120'];

function Home() {
  const [language, setLanguage] = useState('english');
  const [time, setTime] = useState('30');
  const [mode, setMode] = useState<'time' | 'words'>('time');
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { profile } = useAuth(); 

  const handleTestComplete = (data) => {
    setIsActive(false);

      axios.post(`${base_url}/typing-test`, { userId:profile?.user?.id, time, ...data })
    
   
  };

  const { timeLeft, resetTimer } = useTimer(parseInt(time), isActive, setIsComplete);

  useEffect(() => {
    resetTimer();
  }, [time]);

  return (
    <>
    {!profile?.user && 
      <LoginReminder/>
    }
    <div className="min-h-screen bg-[#323437] text-[#646669] flex flex-col">
      <Helmet>
      <title>Monkeytype | Customizable Typing Tests</title>
      <link rel="canonical" href="https://monkeytype.live/" />
      </Helmet>
      <Header/>
      
      <main className="flex-1 flex flex-col items-center w-full px-6 mt-4">
        <div className="w-full max-w-[850px] flex flex-col items-center mb-12">
          {/* Top Settings Bar */}
          {!isComplete &&
            <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            <LanguageSelect
            options={challenges}
            value={language}
            onChange={setLanguage}
            icon={<Globe className="w-4 h-4" />}
            />
            <Dropdown
              options={times}
              value={time}
              onChange={setTime}
              icon={<Timer className="w-4 h-4" />}
            />
            {/* <button className="hover:text-[#d1d0c5] transition-colors flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              default
            </button>
            <button className="hover:text-[#d1d0c5] transition-colors">
              <Settings className="w-4 h-4" />
            </button> */}
          </div>
          }
          

          {showLeaderboard ? (
            <Leaderboard />
          ) : (
            <TypingTest 
              key={`${language}-${time}-${mode}`}
              mode={mode} 
              timeLimit={parseInt(time)} 
              language={language}
              timeLeft={timeLeft}
              setIsActive = {setIsActive}
              isActive = {isActive}
              isComplete = {isComplete}
              setIsComplete = {setIsComplete}
              resetTimer = {resetTimer}
              handleTestComplete = {handleTestComplete}
            />
          )}

          {/* blog */}
           <Blog/>
          {/* blog */}
        </div>
      </main>
    </div>
    </>
  );
}

export default Home;