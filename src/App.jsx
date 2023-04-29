import { useEffect, useState } from "react";
import "./index.css";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const json = await response.json();
      console.log("This is the response json", json);

      if (response.status === 429) {
        console.log("====================================");
        console.log("this is the response message", response.status);
        console.log("====================================");
        setData(json.data);
      } else {
        console.log("The response message is valid");
        setData(json);
      }
    } catch (error) {
      setData(data);
      setLoading(false);

      console.error("HERE IS THE ERROR", error);
    } finally {
      setLoading(false);
    }
  };

  // useEffect for data fetching
  useEffect(() => {
    fetchData();
  });

  // rendered data content
  const RenderedContent = () => {
    return (
      <>
        {data.map((item) => {
          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                flexDirection: "column",
                color: "black",
              }}
            >
              <h4>{item.title}</h4>
              <p>{item.category}</p>
              <img
                src={item.image}
                alt={item.description}
                width={"200px"}
                height={"150px"}
              />
              <p>{item.price}</p>
            </div>
          );
        })}
      </>
    );
  };

  // what is rendered to the root element
  return (
    <>
      {loading ? (
        <>
          <h1 style={{ color: "red" }}>Loading...</h1>
        </>
      ) : (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <RenderedContent />
        </div>
      )}
    </>
  );
};

export default App;
