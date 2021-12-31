import './MoviesList.css';
import MovieItem from "./MovieItem";
import Card from "../../shared/components/UIElements/Card";
import React, {useContext, useState} from "react";
import {useHistory} from "react-router-dom";
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import {AuthContext} from "../../shared/context/auth-context";
import Restricted from "../../shared/permissions/Restricted";

const MoviesList = props => {
    const history = useHistory();
    const [query, setQuery] = useState("");
    const [queryToSearch, setQueryToSearch] = useState("");
    const auth = useContext(AuthContext);

    if (props.items.length === 0) {
        return (<div className="center">
            <Card>
                <h2> No Movies found.</h2>
            </Card>
        </div>)
    }


    const handleClickFind = () =>{
        setQueryToSearch(query);
    }

    return (
        <PermissionProvider permissions={auth.permissions}>
            <Restricted to="View Movies">
                <>
                    <ul className="movies-list">
                        <div className="center">
                        <button style={{height: "40px", width: "150px", backgroundColor: "yellow"}}>All Movies</button>
                        &nbsp;&nbsp;
                        <PermissionProvider permissions={auth.permissions}>
                            <Restricted to="Create Movies">
                        <button style={{height: "40px", width: "150px"}}
                                onClick={() => history.push("/add/movie")}>Add Movie
                        </button>
                            </Restricted>
                        </PermissionProvider>
                        &nbsp;&nbsp;&nbsp;<br/>
                        <input style={{height: "40px", width: "150px"}} type="text" name="query" id="query"
                               value={query}
                               onChange={(e) => setQuery(e.target.value)}
                               placeholder="Search"/>&nbsp;&nbsp;
                        <button style={{height: "40px", width: "120px"}} onClick={handleClickFind} >Find</button>
                        </div>
                        {props.items.filter((val)=>{
                            if (queryToSearch === ""){
                                return val;
                            }
                            else if (val.name.toLowerCase().includes(queryToSearch.toLowerCase())){
                                return val;
                            }
                            return false;
                        }).map(movie => {
                            return <MovieItem key={movie._id} movie={movie} onDelete={props.onDeleteMovie}/>
                        })}
                    </ul>
                </>
            </Restricted>
        </PermissionProvider>)
};

export default MoviesList;
