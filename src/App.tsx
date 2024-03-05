import { useState } from 'react';
import './App.css'
import { PlusCircleIcon } from '@heroicons/react/24/outline';

function App() {
  // const font = ['pixel', 'geometric', 'mono'][Math.floor(Math.random() * 3)];
  const [title, setTitle] = useState(''); 
  const [tokens, setTokens] = useState(0);
  const [color, setColor] = useState<'rose' | 'emerald' | 'blue' | 'zinc'>('zinc');

  const pluralize = (n: number) => {
    if (n === 1) return '';
    return 's';
  }

  const getColor = () => {
    switch(color) {
      case 'rose': return 'bg-rose-400/30'
      case 'emerald': return 'bg-emerald-400/30'
      case 'blue': return 'bg-blue-400/30'
      case 'zinc': return 'bg-zinc-700/30'
    }
  }

  return (
    <div className="h-screen w-screen p-4">
      <h1 className={`text-3xl font-bold mb-3`}><span className="text-red-500">AFH Creative Technology</span> Side Quests</h1>
      <main className="flex gap-8 h-[calc(90vh-2rem)]">
        <div className="bg-zinc-100 p-4 basis-1/2 rounded-lg space-y-4">
          <div className="flex gap-2 flex-nowrap">
            <div className="relative grow">
              <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-zinc-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Sticky Note Title</label>
            </div>
            <div className="bg-white rounded-lg py-2 px-4 flex gap-4 item-center shrink">
              <button className={`rounded-full w-8 h-8 bg-emerald-400 ${color === 'emerald' && 'ring-2 ring-offset-2'}`} onClick={() => setColor('emerald')}></button>
              <button className={`rounded-full w-8 h-8 bg-rose-400 ${color === 'rose' && 'ring-2 ring-offset-2'}`}  onClick={() => setColor('rose')}></button>
              <button className={`rounded-full w-8 h-8 bg-blue-400 ${color === 'blue' && 'ring-2 ring-offset-2'}`}  onClick={() => setColor('blue')}></button>
              <button className={`rounded-full w-8 h-8 bg-zinc-700 ${color === 'zinc' && 'ring-2 ring-offset-2'}`}  onClick={() => setColor('zinc')}></button>
            </div>
          </div>
          <div className="relative">
          <input type="number" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setTokens(parseInt(e.target.value))} min={1} />
            <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-zinc-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tokens</label>
          </div>
        </div>
        <div className="bg-zinc-100 p-4 w-1/2 rounded-lg flex flex-col gap-3 justify-center items-center">
          <div className="text-2xl font-bold">Result</div>
          <div className="bg-white relative flex justify-center items-center p-4 rounded-md">
            <div className="fixed z-50 font-semibold text-2xl rounded-md text-center space-y-4 w-1/4 flex flex-col justify-between h-1/3">
              <div className={`text-2xl text-black bg-white/40 p-4`}>{title}</div>
              <div className="text-4xl font-medium bg-white/40 p-4">{tokens} token{pluralize(tokens)}</div>
            </div>
            <div className="h-full w-full relative">
              <img src="/sticky.png" alt="" className="w-full h-full" />
            </div>
          </div>

          <button className="py-2 px-4 bg-blue-500 rounded-full text-lg inline-flex items-center gap-2 flex-nowrap text-white font-semibold"><PlusCircleIcon className="h-5 stroke-2" /> Add to print</button>
        </div>
      </main>
    </div>
  )
}

export default App

// light green light pink light blue and the default yellow

// yellow: tasks
// blue: games
// green: playtesting, feedback
// pink: personal projects