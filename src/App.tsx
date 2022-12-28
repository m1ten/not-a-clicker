import { useState, useEffect } from "react";

function App() {
  const [title, setTitle] = useState("not-a-clicker");
  const [titleClasses, setTitleClasses] = useState(["text-4xl"]);
  const [value, setValue] = useState(1);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + value);

    if (count % 3 === Math.floor(Math.random() * 10)) {
      fetch("https://uselessfacts.jsph.pl/random.json?language=en")
        .then((response) => response.json())
        .then((data) => {
          const fact = data.text;

          switch (fact.length)
          {
            case fact.length > 100:
              setTitleClasses(["text-2xl"]);
              break;
            case fact.length > 200:
              setTitleClasses(["text-xl"]);
              break;
            case fact.length > 300:
              setTitleClasses(["text-base"]);
              break;
            case fact.length > 400:
              setTitleClasses(["text-sm"]);
              break;
            default:
              setTitleClasses(["text-4xl"]);
              break;
          }

          setTitle(fact);
        }
      );
    }
  };

  useEffect(() => {
    setValue(isNaN(value) ? 1 : value);
  }, [value]);

  const resetAll = () => {
    setValue(1);
    setCount(0);
  };

  return (
    <div className="grid h-screen place-items-center text-neutral-800 dark:text-neutral-200">
      <p id="title" className={titleClasses.join(" ") + " text-center"}>{title}</p>

      <div className="row-auto">
        <div>
          <input
            id="value-input"
            onChange={(e) => setValue(Number(e.target.value) || 1)}
            placeholder="Enter a value to increment by..."
            className="border-2 border-neutral-300 dark:border-neutral-700 
            rounded-md p-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 
            dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 
            focus:border-transparent w-60"
            value={value}
          />
        </div>
      </div>

      <div className="row-auto">
        <button type="button" onClick={() => increment()} className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mr-2">
          Add
        </button>

        <button type="button" onClick={() => resetAll()} className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded ml-2">
          Reset
        </button>
      </div>

      <p className="text-4xl font-bold">
        {count}
      </p>

      <div>
        <p className="text-sm text-gray-500 text-center">
          Made with
          {' '}
          <span role="img" aria-label="heart">❤️</span>
          {' '}
          by
          {' '}
          <a className="text-blue-500 hover:text-blue-700">miten</a>
        </p>
        <p className="text-xs text-gray-500 text-center italic">
          isn't this what all web devs put in their footer?
        </p>
      </div>
    </div>
  );
}

export default App;
