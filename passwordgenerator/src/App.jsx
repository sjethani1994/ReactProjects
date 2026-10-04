import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numbersAllowed, setnumbersAllowed] = useState(true);
  const [charactersAllowed, setCharactersAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let numbers = "0123456789";
    let characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let password = "";

    if (numbersAllowed) characters += numbers;
    if (charactersAllowed) characters += "!@#$%^&*()_+-=[]{}|;':\",./<>?~";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * characters.length + 1);
      password += characters.charAt(char);
    }
    setPassword(password);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      passwordRef.current.setSelectionRange(0, length);
      document.execCommand("copy");
    }
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3 border-none bg-gray-700 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordToClipBoard}
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor=pointer w-32 accent-orange-500"
            />
            <span className="text-orange-500 text-xl">{length}</span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => {
                setnumbersAllowed((prev) => !prev);
              }}
            />
            <span
              className="text-orange-500"
              style={{ fontSize: "16px", paddingTop: "6px" }}
            >
              Numbers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="characterInput"
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <span
              className="text-orange-500"
              style={{ fontSize: "16px", paddingTop: "6px" }}
            >
              Characters
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
