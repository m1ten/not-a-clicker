import { useState } from "react";
import { fetch } from "@tauri-apps/api/http";
import * as mathjs from "mathjs";

const generateEquation = (difficulty: number) => {
  if (difficulty <= 4) {
    // Generate an equation with addition and subtraction
    const num1 = Math.floor(Math.random() * 10 + 1);
    const num2 = Math.floor(Math.random() * 10 + 1);
    const operation = Math.random() < 0.5 ? '+' : '-';
    const equation = `${num1} ${operation} ${num2}`;
    return equation;
  } else if (difficulty >= 5) {
    // Generate an equation with multiplication or division, with addition and subtraction
    const num1 = Math.floor(Math.random() * 10 + 1);
    const num2 = Math.floor(Math.random() * 10 + 1);
    const operation1 = Math.random() < 0.5 ? '*' : '/';
    const operation2 = Math.random() < 0.5 ? '+' : '-';
    const equation = `${num1} ${operation1} ${num2} ${operation2} ${num1}`;
    return equation;
  } 
}


const App = () => {
  const [title, setTitle] = useState("not-a-clicker");
  const [titleUrl, setTitleUrl] = useState("404");
  const [titleState, setTitleState] = useState(0);
  const [value, setValue] = useState("1");
  const [count, setCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const [difficulty, setDifficulty] = useState(1);

  const categories = [
    "Culture",
    "Geography",
    "Health",
    "History",
    "Human activities",
    "Mathematics",
    "Natural sciences",
    "People",
    "Philosophy",
    "Religions",
    "Society",
    "Technology",
  ];

  const [category, setCategory] = useState(categories[Math.floor(Math.random() * categories.length)]);

  const update = async () => {

    setIsDisabled(true);

    if (titleState === 2) {
      let solution: number;

      try {
        solution = mathjs.evaluate(title);
      } catch (e) {
        console.warn(e);
        setTitleState(0);
        setTitle("not-a-clicker");
        setIsDisabled(false);
        return;
      }

      if (parseFloat(solution.toPrecision(2)) === parseFloat(value)) {
        setTitleState(0);
        setTitle("not-a-clicker");

        setValue("1");
      } 
      
      setIsDisabled(false);
      return;
    }

    if (isNaN(parseFloat(value))) {

      setTitleState(0);

      setCount(count + 1);

      setCategory(categories.includes(value) ? value : category);

      setValue("1");

    } else {

      setTitleState(0);

      setCount(count + parseFloat(value));
    }

    if (count % 3 === Math.floor(Math.random() * 10)) {

      setTitleState(1);

      const response = await fetch(`https://en.wikipedia.org/wiki/Special:RandomInCategory/${category}`, {
        method: 'GET',
        timeout: 30,
        responseType: 2,
      }) as any;

      setTitle(response.data.match(/<title>(.*?)<\/title>/)[1].replace(" - Wikipedia", ""));
      setTitleUrl(response.data.match(/<link rel="canonical" href="(.*?)"/)[1]);
    } else if (count % 10 === Math.floor(Math.random() * 10)) {

      setTitleState(2);

      const equation: string = generateEquation(difficulty) || "0";

      console.log(`difficulty: ${difficulty}`)
      setDifficulty(difficulty + 1);

      setTitle(equation);
      setTitleUrl("https://www.wolframalpha.com/input/?i=" + encodeURIComponent(equation));

      console.log(`equation: ${equation}`);
      console.log(`solution: ${mathjs.evaluate(equation)}`)
    }

    console.log(`count: ${count}`);
    console.log(`category: ${category}`);
    console.log(`value: ${value}`);

    setIsDisabled(false);
    return;
  };

  const resetAll = () => {
    console.warn("Resetting all values...");
    setTitle("not-a-clicker");
    setTitleUrl("404");
    setTitleState(0);
    setValue("1");
    setCount(0);
    setDifficulty(1);
    setCategory(categories[Math.floor(Math.random() * categories.length)]);

    console.log(value);
    console.log(count);
    console.log(category);
  };
  
  return (
    <div className="grid h-screen place-items-center text-neutral-800 dark:text-neutral-200">
      <a href={titleUrl} target="_blank" rel="noreferrer" className="text-4xl text-center">{title}</a>

      <div className="row-auto">
        <div>
          <input
            id="value-input"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter any value..."
            className="border-2 border-neutral-300 dark:border-neutral-700 
            rounded-md p-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 
            dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 
            focus:border-transparent w-60"
            value={value}
          />
        </div>
      </div>

      <div className="row-auto">
        <button id="update-btn" type="button" onClick={() => update()} className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded mx-2" disabled={isDisabled}>
          Update
        </button>

        <button id="reset-btn" type="button" onClick={() => resetAll()} className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded mx-2">
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
        <p className="text-xs text-gray-500 text-center italic">
          <a href="https://en.wikipedia.org/">
            Source: Wikipedia
          </a>
        </p>
      </div>
    </div>
  );
}

export default App;