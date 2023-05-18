import './App.css';
import GrantApplication from "./GrantApplication";

function App() {
  const handleSubmit = (formData) => {
    console.log("Submitted form data:", formData);
    // Here you could send a POST request to your backend API to save the application.
};
  return (
    <div className="App">
      <GrantApplication onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
