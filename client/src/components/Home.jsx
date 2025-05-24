import SearchBar from "./SearchBar";
import Navbar from './Navbar';
import TopResult from "./TopResult";
import Footer from "./Footer";

function Home(){
    return(
        <div>
            <Navbar/>
            <SearchBar/>
            <TopResult/>
            <Footer/>
        </div>
    );
}
export default Home;