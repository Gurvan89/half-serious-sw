export default function Galaxy({children}) {
  return (
    <div className="mainContainer">
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>
      <div className="comet"></div>
      <h1 className="title">
        Half
        <br />
        Serious
      </h1>
        { children }
    </div>
  );
}
