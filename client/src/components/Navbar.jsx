function Navbar(){
    return(
            <div className="flex p-7 bg-[#B3C100] text-white text-2xl gap-2 font-semibold">
            <div>SiteAlive</div>
            <div className="flex gap-6 w-full justify-end">
                <div>Features</div>
                <div>Service</div>
                <div>About Us</div>
            </div>
            <div></div>
        </div>
    );
}
export default Navbar;