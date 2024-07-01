import SearchParams from "./searchParams";
import {createRoot} from "react-dom/client";
import { Link, BrowserRouter, Routes, Route } from "react-router-dom";
import Details from "./Details";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

// const Pet= (props)=>{
//     return React.createElement("div", 
//         {},[   
//             React.createElement("h1",{},props.name),
//             React.createElement("h2",{},props.animal),
//             React.createElement("h2",{},props.breed),
// ])
// }


const App = ()=>{
    // return React.createElement(
    //     "div",
    //     {},
    //     [React.createElement("h1",{},"Adopt Me"),
    //         React.createElement(Pet,{
    //             name:"Luna",
    //             animal:"Dog",
    //             breed:"Labra"
    //         }),
    //         React.createElement(Pet,{
    //             name:"Eddy",
    //             animal:"Bird",
    //             breed:"Parrot"
    //         }),
    //         React.createElement(Pet,{
    //             name:"Kitty",
    //             animal:"Cat",
    //             breed:"Persian"
    //         })
    //     ]
    // );
    return(
        <div>
        {/* <h1>Adopt Me!</h1>
        <SearchParams/> */}
        <BrowserRouter>
        <QueryClientProvider client={queryClient}>
        <header>
            <Link to="/">Adopt Me!</Link>
        </header>
        <Routes>
            <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} />
        </Routes>
        </QueryClientProvider>
        </BrowserRouter>
        </div>
    )
};

const container= document.getElementById("root");
const root = createRoot(container);
root.render(<App/>);
