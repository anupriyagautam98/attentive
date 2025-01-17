import {useState} from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
// import Pet from "./Pet"
import Results from "./Results";
import useBreedList from "./useBreedList";

const Animals=["dog","cat","rabbit","bird","reptile"];

const SearchParams=()=>{
    // const [location, setLocation]= useState("");
    const [animal,setAnimal]=useState("");
    // const [breed,setBreed]=useState("");
    // const [pets,setPets]=useState([]);
    const [breeds]=useBreedList(animal);
    const [requestParams, setRequestParams] = useState({
        location: "",
        animal: "",
        breed: "",
      });

    // useEffect(()=>{
    //     requestPets();
    // },[]);

    // async function requestPets(){
    //     const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    //     );
    //     const json = await res.json();
    //     setPets(json.pets);
    // }

    const results = useQuery(["search", requestParams], fetchSearch);
    const pets = results?.data?.pets ?? [];

    return(
        <div className='search-params'>
            <form action="" onSubmit={e=>{
                e.preventDefault();
                // requestPets();
                const formData = new FormData(e.target);
                const obj = {
                animal: formData.get("animal") ?? "",
                breed: formData.get("breed") ?? "",
                location: formData.get("location") ?? "",
                };
                setRequestParams(obj);
            }}>
                <label htmlFor="location">
                    Location 
                    <input 
                    type="text"
                    // value={location}
                    name='location'
                    id="location"
                    placeholder='Location'
                    // onChange={(e)=>setLocation(e.target.value)} 
                    />
                </label>
                <label htmlFor="animal">
                    Animal 
                    <select 
                    id="animal"
                    value={animal}
                    onChange={e=>{
                        setAnimal(e.target.value);
                        // setBreed("");
                    }}
                    onBlur={(e) => {
                        setAnimal(e.target.value);
                        // setBreed("");
                      }}
                    >
                        <option/>
                        {Animals.map((animal)=>(
                            <option key={animal} value={animal}>
                                {animal}
                            </option>
                        ))}
                    </select>
                </label>

                <label htmlFor="breed">
                    Breed 
                    <select 
                    disabled={breeds.length===0}
                    id="breed"
                    name='breed'
                    // value={breed}
                    // onChange={e=>{
                    //     setBreed(e.target.value);
                    // }}
                    >
                        <option />
                        {breeds.map((breed)=>(
                            <option key={breed} value={breed}>
                                {breed}
                            </option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            {
                <Results pets={pets}/>
            }
        </div>
    )
}

export default SearchParams;
