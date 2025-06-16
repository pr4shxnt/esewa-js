// src/App.tsx
import "./App.css";
import { data } from "./components/data";
import DataCard from "./components/dataCard";
import "./index.css";

function App() {
  console.log(data);

  return (
    <div style={{ padding: "20px" }}>
      <header>
        <title>esewa-react</title>
        <h1 className="font-light text-2xl mb-4">
          Hey Developer, This website/library is made by{" "}
          <a href="https://www.prashantadhikari7.com.np" className="hover:text-purple-500 hover:underline">
            Prashant Adhikari
          </a>
        </h1>
        <div className="w-full mb-6 flex items-center justify-center ">
          <div className="bg-pink-100 p-6">
          <h1 className="text-4xl font-bold uppercase">Credentials</h1>
          <div className="pt-3">
          <p className="text-xl">Esewa-Id: 9806800001</p>
          <p className="text-xl">Password: Nepal@123</p>
          <p className="text-xl">OTP: 123456</p>
</div></div>
        </div>
      </header>
      <div className="grid grid-cols-4 gap-3">
        {data.map((dataObjects, index) => {
          return (
            <div key={index} className="">
              <DataCard
                name={dataObjects.name}
                price={dataObjects.price}
                productCode={dataObjects.productCode}
                image={dataObjects.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
