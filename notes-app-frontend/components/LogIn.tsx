import React from 'react';

interface LogInProps{
  showSignInbox: () => void;
  logInFunction: (email: string, password: string) => void; 
}

function LogIn({showSignInbox, logInFunction}: LogInProps) {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailInputLogIn = (document.querySelector("#emailInputLogIn") as HTMLInputElement).value;
    const passwordInputLogIn = (document.querySelector("#passwordInputLogIn") as HTMLInputElement).value;
    if(emailInputLogIn && passwordInputLogIn){
      logInFunction(emailInputLogIn, passwordInputLogIn);
    }
  }
  
  const signInInsteadLocal = (event: React.MouseEvent<HTMLButtonElement>) => {
    const emailInputLogIn = (document.querySelector("#emailInputLogIn") as HTMLInputElement);
    const passwordInputLogIn = (document.querySelector("#passwordInputLogIn") as HTMLInputElement);
    emailInputLogIn.value = '';
    passwordInputLogIn.value = '';
    event.preventDefault();
    showSignInbox();
}

  return (
    <div className='h-screen w-screen bg-black text-sky-50 flex flex-col justify-center items-center'>
      <p className="select-none text-5xl mb-8 ">
        Heart Notes
      </p>
      <div id="logInBox" className="pl-6 pr-6 mt-4 border-2 border-slate-800 rounded-xl bg-gray-950">
        <p className="m-8 select-none mr-auto ml-auto text-2xl text-center">
          Login to Your Account
        </p>

        <form onSubmit={handleSubmit} id="logInForm" action="" method="post" className="m-8 flex flex-col">

          <p className="mt-2 select-none">Email:</p>
          <input id='emailInputLogIn' type="email" name="name" placeholder="" className="p-2 pl-8 pr-8 border-2 border-slate-600 bg-slate-950 text-white rounded-xl" />

          <p className="mt-2 select-none">Password:</p>
          <input id='passwordInputLogIn' type="password" name="name" placeholder="" className="p-2 pl-8 pr-8 border-2 border-slate-600 bg-slate-950 text-white rounded-xl" />

          <button type='submit' className="border-2 border-slate-800 w-max p-2 pl-8 pr-8 mt-4 ml-auto mr-auto rounded-full hover:border-slate-700 hover:bg-slate-950 cursor-pointer select-none">Log In</button>

          <button onClick={signInInsteadLocal} className="mt-4 underline cursor-pointer select-none">Sign In Instead</button>
        </form>
      </div>
    </div>
  );
}

export default LogIn;