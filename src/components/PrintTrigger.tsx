import { Dialog } from '@headlessui/react';
import html2PDF from 'jspdf-html2canvas';

import { useRef, useState } from 'react';

interface StickyNote {
  name: string;
  noteTheme: string | '/default.png';
  tokens: number;
}

export default function PrintTrigger({ list }: { list: StickyNote[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const handlePrint = () => {
    html2PDF(document.getElementById('grid')!, {
      jsPDF: {
        format: 'letter',
        
      },
      imageType: 'image/jpeg',
      output: './pdf/generate.pdf',
      success: (pdf) => {
        pdf.autoPrint();
        pdf.output('dataurlnewwindow');
      }
    });
  
    setIsOpen(false);
  };

  return (
    <>
      <button className="font-bold text-lg text-white line-clamp-3 mb-2" onClick={() => setIsOpen(true)}>Print</button>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        initialFocus={cancelButtonRef}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />

          {/* This is the dialog content */}
          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle">
            <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <Dialog.Title as="h2" className="text-xl leading-6 font-medium text-gray-900">
                    Printable Sticky Notes
                  </Dialog.Title>
                  <div className="mt-2">
                    <div className="grid grid-cols-2 gap-5 p-12 lora" id="grid">
                      {list.map((stickyNote, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <div
                            className="w-48 h-48 p-4 text-center font-bold"
                            style={{ backgroundImage: `url(${stickyNote.noteTheme})`, backgroundSize: 'cover' }}
                          >
                            <div className="flex flex-col justify-between h-full p-4">
                              <p className="text-lg text-gray-700 font-semibold mb-2">{stickyNote.name || 'Sticky Note Title'}</p>
                              <p className="text-xl text-gray-700">{stickyNote.tokens} tokens</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Print PDF
              </button>
              <button
                type="button"
                ref={cancelButtonRef}
                onClick={() => setIsOpen(false)}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}