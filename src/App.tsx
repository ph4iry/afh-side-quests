import { Fragment, useState } from 'react';
import './App.css'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import useFitText from 'use-fit-text';
import StickyNoteSample from './components/StickyNoteSample';
import PrintTrigger from './components/PrintTrigger';

interface StickyNote {
  name: string,
  noteTheme: string | '/default.png',
  tokens: number,
}

function App() {
  // const font = ['pixel', 'geometric', 'mono'][Math.floor(Math.random() * 3)];
  const [title, setTitle] = useState(''); 
  const [tokens, setTokens] = useState(0);
  const [bg] = useState('/olden.png')
  const [color, setColor] = useState<'quest' | 'reward'>('quest');
  const { fontSize, ref } = useFitText();

  const [toPrintList, setToPrintList] = useState<StickyNote[]>([]);
  const [, forceUpdate] = useState<number>();

  const pluralize = (n: number) => {
    if (n === 1) return '';
    return 'S';
  }

  const handleAddToPrint = () => {
    const temp = toPrintList;
    temp.push({
      name: title,
      tokens,
      noteTheme: bg
    })
    setToPrintList(temp);
    forceUpdate(Math.random());
    console.log(toPrintList);
  }

  return (
    <div className="h-screen w-screen p-4">
      <h1 className={`text-3xl font-bold mb-3`}><span className="text-red-500">AFH Creative Technology</span> Side Quests</h1>
      <main className="flex gap-8 h-min mb-8">
        <div className="bg-zinc-100 p-4 basis-1/2 rounded-lg space-y-4">
          <div className="flex gap-2 flex-nowrap">
            <div className="relative grow">
              <input type="text" id="floating_outlined1" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setTitle(e.target.value)} />
              <label htmlFor="floating_outlined1" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-zinc-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Sticky Note Title</label>
            </div>
            <div className="bg-white rounded-lg py-2 px-4 flex gap-4 item-center shrink">
              <button className={`rounded-full px-3 py-2 font-bold text-white mono bg-amber-600/70 ${color === 'quest' && 'ring-2 ring-offset-2'}`} onClick={() => setColor('quest')}>QUEST</button>
              <button className={`rounded-full px-3 py-2 font-bold text-white mono bg-zinc-700 ${color === 'reward' && 'ring-2 ring-offset-2'}`}  onClick={() => setColor('reward')}>REWARD</button>
            </div>
          </div>
          <div className="relative">
          <input type="number" id="floating_outlined2" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={(e) => setTokens(parseInt(e.target.value))} min={1} />
            <label htmlFor="floating_outlined2" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-zinc-100 dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Tokens</label>
          </div>
        </div>
        <div className="bg-zinc-100 p-4 w-1/2 rounded-lg flex flex-col gap-3 justify-center items-center">
          <div className="text-2xl font-bold">Result</div>
          <div className="bg-white relative flex justify-center items-center p-4 rounded-md">
            <div className="absolute top-[20%] z-10 font-bold lora leading-normal text-6xl rounded-md text-center w-2/3 flex flex-col h-1/2">
              <div className="text-2xl">{color.toUpperCase()}:</div>
              <div className={`text-black p-4 text-wrap max-h-[100%]`} style={{ fontSize }} ref={ref}>{title || 'Sticky Note Title'}</div>
              <div className="text-5xl font-medium p-4">{tokens} TOKEN{pluralize(tokens)}</div>
            </div>
            <div className="h-full w-full relative">
              <img src={bg} alt="" className="min-h-[500px] w-full h-full" />
            </div>
          </div>

          <button className="py-2 px-4 bg-blue-500 rounded-full text-lg inline-flex items-center gap-2 flex-nowrap text-white font-semibold" onClick={handleAddToPrint}><PlusCircleIcon className="h-5 stroke-2" /> Add to print</button>
        </div>
      </main>

      <div className="bg-zinc-100 rounded-lg w-full h-32 p-4 flex gap-4 justify-between">
        <div className="gap-4 flex">
        {toPrintList.map((tp, i) => (
          <Fragment key={i}>
            <StickyNoteSample list={toPrintList} updateList={setToPrintList} forceUpdate={() => forceUpdate(Math.random())} stickyNote={tp} />
          </Fragment>
        ))}
        </div>
        <div className="w-24 w-24  bg-blue-500 rounded-lg flex flex-col items-center justify-center p-3 text-center relative">
          <PrintTrigger list={toPrintList} />
        </div>
      </div>
    </div>
  )
}

export default App

// light green light pink light blue and the default yellow

// yellow: tasks
// blue: games
// green: playtesting, feedback
// pink: personal projects
