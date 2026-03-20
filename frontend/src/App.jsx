import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignOutButton,
} from "@clerk/clerk-react";

import "./App.css";

function App() {
  return (
    <>
      <h1>Welcome to the app.</h1>

      <SignedOut>
        <SignInButton mode="model" className="sign-btn" />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>

      <SignedIn>
        <UserButton /> 
      </SignedIn>
    </>
  );
}

export default App;
