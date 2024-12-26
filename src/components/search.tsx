import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const Search = () => {
    return (
        <div>
            <form>
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <SearchIcon className="" />
                <Input
                    type="search"
                    id="search"
                    placeholder="Search images..."
                    className="w-full m-5 rounded-md  border-spacing-3 px-5 py-6 text-base md:text-sm overflow-hidden focus-visible:ring-0"
                    />
            </form>
        </div>
    );
}
 
export default Search;