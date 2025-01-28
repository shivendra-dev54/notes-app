// import React from 'react';

interface HomePageProps{
    showSignInbox: () => void 
}

function HomePage({showSignInbox}:HomePageProps) {

    return (
        <div className='h-screen w-screen bg-black text-white justify-between flex flex-col items-center'>
            <p className="text-9xl text-center p-4 rounded-lg mt-24 select-none text-glow">
                Heart Notes
            </p>
            <p id="desc">
                This is a Notes app created by Shivendra Devadhe
            </p>
            <div className="flex justify-end w-screen mt-10 bottom-0">
                <button className="mb-16 mr-12 p-2 pl-8 bg-slate-900 pr-8 border-2 border-slate-700 rounded-xl hover:border-slate-600 hover:bg-slate-950 select-none" onClick={showSignInbox}>
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default HomePage;