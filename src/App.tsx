
const App = () => {
  return (
    <div>
      <div className="grid">
        {[1,2,3,4,5].map((id, index) => (
          <div key={index}>Hello</div>
        ))}
      </div>
    </div>
  );
};

export default App;
