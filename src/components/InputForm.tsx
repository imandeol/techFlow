import { SetStateAction, useState } from "react";

const InputForm: React.FC = () => {
  const [inputIdea, setInputIdea] = useState("");

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setInputIdea(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted paragraph:", inputIdea);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="paragraphInput">Enter your App Idea:</label>
        <textarea
          id="paragraphInput"
          value={inputIdea}
          onChange={handleChange}
          rows={10}
          cols={50}
          placeholder="Type your app idea here..."
          style={{ width: "100%", padding: "10px", fontSize: "16px" }}
        />
        <button type="submit" style={{ marginTop: "10px" }}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default InputForm;
