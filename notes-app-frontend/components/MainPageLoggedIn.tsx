import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';

interface Note {
    body: string;
    createdAt: string;
    title: string;
    updatedAt: string;
    user_id: string;
    __v: string;
    _id: string;
}

interface MainPageLoggedInProps {
    addNewNotefunction: (title: string, body: string) => void;
    getAllNotesFunction: () => Promise<Note[]>;
    logOutFunction: () => void;
}

function MainPageLoggedIn({ addNewNotefunction, getAllNotesFunction, logOutFunction }: MainPageLoggedInProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [notes, setNotes] = useState<Note[]>([]);
    
    useEffect(() => {
        localGetAllNotesFunction();
      }, []);

    const toggleVisibility = (event: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setIsVisible(!isVisible);
    };

    const addNoteReqLocal = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const title = (document.querySelector("#titleBox") as HTMLInputElement).value;
        const body = (document.querySelector("#noteBox") as HTMLInputElement).value;
        if (body && title) {
            await addNewNotefunction(title, body);
        }
        toggleVisibility(event);
        await localGetAllNotesFunction();
    };

    const localGetAllNotesFunction = async () => {
        try {
            const notes = await getAllNotesFunction();
            console.log("Notes fetched:", notes);
            setNotes(notes); // Store the notes in state
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    useEffect(() => {
        localGetAllNotesFunction();
    }, []);

    return (
        <div className='h-screen w-screen overflow-x-hidden bg-slate-900 scrollbar flex flex-col justify-center items-center'>
            <div className='text-sky-50 flex flex-col justify-between items-center h-screen w-screen bg-black'>
                <header className='h-1/10 w-screen text-center flex justify-between select-none'>
                    <p className='flex justify-center items-center ml-8 text-5xl'>
                        Heart Notes
                    </p>
                    <div onClick={logOutFunction} id="logOutButton" className='flex justify-center items-center mr-8'>
                        <button id="logOutButton" className='p-2 pl-8 pr-8 border-2 border-slate-600 ml-5 mr-5 rounded-xl bg-slate-900'>Log out</button>
                    </div>
                </header>

                <main className='h-9/10 w-screen bg-slate-950 flex flex-col items-center justify-center'>
                    <div className={`w-3/4 ${isVisible ? 'h-1/4' : 'h-2/4'} bg-slate-900 p-2 border-b-2 border-slate-700`}>
                        {isVisible ? (
                            <div className='w-full h-full flex justify-evenly items-center flex-col' id='normalDiv'>
                                <p className='text-5xl self-start ml-5 select-none text-slate-500'>
                                    Click here to add new note
                                </p>
                                <button
                                    className='self-end mr-5 pr-8 pl-8 p-2 rounded-xl select-none cursor-pointer border-2 border-slate-600 bg-slate-950 hover:border-slate-600 hover:bg-slate-900'
                                    id='normalDivButton'
                                    onClick={toggleVisibility}
                                >
                                    Add
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={addNoteReqLocal} className='h-full flex flex-col items-start justify-between' id='addNoteDiv'>
                                <div className='w-full h-2/6 flex'>
                                    <p className='p-2 h-2/2 mb-2 w-1/10 border-2 border-slate-700 border-r-0 bg-slate-950 rounded-s-xl select-none flex justify-center items-center text-center border-b-0 rounded-b-none'>
                                        Title
                                    </p>
                                    <input
                                        type="text"
                                        placeholder='Title here...'
                                        className='p-2 h-full w-9/10 bg-slate-950 border-2 border-slate-700 inline-block rounded-e-xl border-b-0 rounded-b-none'
                                        id='titleBox'
                                    />
                                </div>
                                <div className='w-full h-3/6 flex'>
                                    <p className='p-2 h-2/2 mb-2 w-1/10 border-2 border-slate-700 border-r-0 bg-slate-950 rounded-s-xl select-none flex justify-center items-center text-center rounded-t-none'>
                                        Note
                                    </p>
                                    <input
                                        type="text"
                                        placeholder='Add your note here...'
                                        className='p-2 h-full w-9/10 bg-slate-950 border-2 border-slate-700 inline-block rounded-t-none rounded-e-xl'
                                        id='noteBox'
                                    />
                                </div>
                                <div className='w-full h-1/6 flex justify-end mr-4'>
                                    <button
                                        className='pr-8 pl-8 border-2 border-slate-700 bg-slate-950 rounded-xl select-none cursor-pointer hover:border-slate-600 hover:bg-slate-900'
                                        id='addNewNoteButton'
                                        type='submit'
                                    >
                                        Add
                                    </button>
                                    <button
                                        className='ml-2 pr-8 pl-8 border-2 border-slate-700 bg-slate-950 rounded-xl select-none cursor-pointer hover:border-slate-600 hover:bg-slate-900'
                                        onClick={toggleVisibility}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className='w-3/4 h-3/4 bg-slate-900'>
                        <div id='noteList' className='w-9/10 p-2'>
                            <h2 className='text-2xl mb-4'>Notes</h2>
                            {notes.map((note) => (
                                <div key={note._id} className='mb-2 p-2 border border-slate-700 rounded'>
                                    <h3 className='text-xl'>{note.title}</h3>
                                    <p>{note.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainPageLoggedIn;
