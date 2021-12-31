import './UsersList.css';
import UserItem from "./UserItem";
import Card from "../../shared/components/UIElements/Card";
import {useHistory} from "react-router-dom";

const UsersList = props => {
    const history = useHistory();

    if(props.items.length === 0){
        return (<div className="center">
            <Card>
            <h2> No Users were found.</h2>
            </Card>
        </div>)
    }

    return(<>
       <><ul className="user-list">
        <button style={{height:"40px",width:"150px",backgroundColor: "yellow"}}>All Users</button> &nbsp;&nbsp;
        <button style={{height:"40px",width:"150px"}}
                onClick={()=> history.push("/add/user")}>Add User</button>
    </ul>
        <div className="content-container-users">
        {props.items.map(user=>{
            return <UserItem key={user._id} user={user} onDelete={props.onDeleteUser} />})}
        </div>
        </>
    </>)
};

export default UsersList;
