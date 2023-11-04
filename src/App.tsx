import Header from "@components/Header/Header";

const App = () => {
  return (
    <div>
      <Header />
      <div className="grid">
        {[1,2,3,4,5].map((id, index) => (
          <div key={index}>Hello</div>
        ))}
      </div>
    </div>
  );
};

export default App;
