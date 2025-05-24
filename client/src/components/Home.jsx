import SearchBar from "./SearchBar";
import Navbar from './Navbar';
import TopResult from "./TopResult";

function Home(){
    return(
        <div>
            <Navbar/>
            <SearchBar/>
            <TopResult/>
        </div>
    );
}
export default Home;