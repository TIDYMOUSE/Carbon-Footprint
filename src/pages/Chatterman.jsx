import { useState, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Loader from "../loader";

const Chatterman = () => {
  const genAi = new GoogleGenerativeAI(
    "AIzaSyASNHl3COA3gbAAF1mEnJxLJPRX3ozPMFk"
  );
  const model = genAi.getGenerativeModel({ model: "gemini-pro" });

  const [history, setHistory] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (!history.length) {
      console.log("No data yet");
    } else {
      console.log(localStorage.getItem("chatHistory"));
      let a = JSON.parse(localStorage.getItem("chatHistory"));

      if (a) {
        setHistory([...a]);
      }
      console.log(history);
    }
  }, []);

  const handleQuery = async (e) => {
    e.preventDefault();
    setSpinner(true);
    console.log(query);
    setResponse("");
    let prev =
      "Use previous context(if applicable) previous questions and their responses are provided as follows: \n";
    if (history) {
      for (let i = 0; i < history.length; i++) {
        prev = prev + history[i].query + ": " + history[i].response + ", ";
      }
    }

    const r = await getResponse(
      query +
        "\n.Generate response in paragraph format without points in around 50 words.\n" +
        "\n Do not generate responses if not related to coal and carbon footprints else return a unaware response.\n" +
        prev
    );
    history.push({ query: query, response: r });
    localStorage.setItem("chatHistory", JSON.stringify(history));
    setQuery("");
  };

  async function getResponse(inp) {
    let txt = "";
    try {
      const result = await model.generateContentStream(inp);
      setSpinner(false);

      for await (const chunk of result.stream) {
        console.log(chunk, typeof chunk);
        const chunkText = chunk.text();
        txt += chunkText;
        setResponse((prev) => prev + chunkText);
      }
      console.log(result);
      console.log("text: ", txt);
    } catch (err) {
      console.log(err);
      localStorage.setItem("chatHistory", "");
    }
    return txt;
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleQuery(e);
      e.preventDefault(); // Prevent the default action (form submission, etc.)
    }
  };
  return (
    <div className="   gap-2 p-10">
      <div className="flex items-center h-full justify-center w-full">
        {spinner && <Loader />}
      </div>

      <div className="w-full h-full flex flex-col justify-center items-center ">
        {!spinner && response && (
          <div className="w-3/4 text-lg border-primary border-2 p-6 rounded-md bg-background/75">
            <h2 className="text-2xl font-action mb-2">Coal Chatterman :</h2>
            <div className="">{response}</div>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="flex gap-2 justify-center items-center w-full fixed bottom-0 m-3 ">
          <input
            className="w-3/4 h-16 px-4 text-gray-500 bg-gray-100 border-0 rounded-md placeholder-gray-500"
            placeholder="Enter your query"
            onKeyDown={handleKeyDown}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className=" h-16 px-3 bg-accent text-white rounded-md hover:bg-accent/80"
            onClick={handleQuery}
          >
            ENTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatterman;
