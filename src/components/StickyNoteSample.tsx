import { Dispatch, SetStateAction } from "react";

interface StickyNote {
  name: string,
  noteTheme: string | '/default.png',
  tokens: number,
}

export default function StickyNoteSample({ list, updateList, stickyNote, forceUpdate } :{
  list: StickyNote[],
  updateList: Dispatch<SetStateAction<StickyNote[]>>
  stickyNote: StickyNote,
  forceUpdate: () => void
}) {
  const handleClick = () => {
    const newList = list;
    const idx = newList.findIndex(l => l.name === stickyNote.name);
    newList.splice(idx, 1);
    updateList(newList);
    forceUpdate();
  }
  return (
    <div className="w-24 w-24 bg-white rounded-lg flex flex-col items-center justifiy-center p-3 text-center relative">
      <button onClick={handleClick} className="w-4 h-4 bg-rose-400 absolute top-[-4px] left-[-4px] rounded-full flex items-center justify-center text-xs text-white hover:bg-rose-500 transition">x</button>
      <div className="text-bold text-sm line-clamp-2 mb-2">{stickyNote.name || 'Sticky Note Title'}</div>
      <div className="text-bold text-md line-clamp-3">- {stickyNote.tokens} -</div>
    </div>
  )
}