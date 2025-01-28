// import React from 'react';

interface SignInProps{
    logInInstead : () => void;
    signInFunction: (name: string, email: string, password: string) => void;
};

function SignIn({logInInstead, signInFunction}:SignInProps){

    const logInInsteadLocal = (event: React.MouseEvent<HTMLButtonElement>) => {
        (document.querySelector("#nameInput") as HTMLInputElement).value = '';
        (document.querySelector("#emailInput") as HTMLInputElement).value = '';
        (document.querySelector("#passwordInput") as HTMLInputElement).value = '';
        event.preventDefault();
        logInInstead();
    }

    const handleSubmitLocal = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nameInput = (document.querySelector("#nameInput") as HTMLInputElement).value;
        const emailInput = (document.querySelector("#emailInput") as HTMLInputElement).value;
        const passwordInput = (document.querySelector("#passwordInput") as HTMLInputElement).value;
        if(nameInput && emailInput && passwordInput){
            signInFunction(nameInput, emailInput, passwordInput);
        }
    };

    return (
        <div className='h-screen w-screen bg-black text-sky-50 flex flex-col justify-center items-center'>
            <p className="select-none text-5xl mb-8 ">
                Heart Notes
            </p>
            <div id="signInBox" className="pl-6 pr-6 mt-4 border-2 border-slate-800 rounded-xl bg-gray-950">
                <p className="m-8 select-none mr-auto ml-auto text-2xl text-center">
                    Create Your Account
                </p>

                <form onSubmit={handleSubmitLocal} id="signInForm" action="" method="post" className="m-8 flex flex-col">
                    <p className="mt-6 select-none">Name:</p>
                    <input id="nameInput" type="text" placeholder="" className="p-2 pl-8 pr-8 border-2 border-slate-600 bg-slate-950 text-white rounded-xl" />

                    <p className="mt-2 select-none">Email:</p>
                    <input id="emailInput" type="email" placeholder="" className="p-2 pl-8 pr-8 border-2 border-slate-600 bg-slate-950 text-white rounded-xl" />

                    <p className="mt-2 select-none">Password:</p>
                    <input id="passwordInput" type="password" placeholder="" className="p-2 pl-8 pr-8 border-2 border-slate-600 bg-slate-950 text-white rounded-xl" />

                    <button type='submit' className="border-2 border-slate-800 w-max p-2 pl-8 pr-8 mt-4 ml-auto mr-auto rounded-full hover:border-slate-700 hover:bg-slate-950 select-none">Sign In</button>

                    <button onClick={logInInsteadLocal} className="mt-4 underline cursor-pointer select-none">Log In Instead</button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;