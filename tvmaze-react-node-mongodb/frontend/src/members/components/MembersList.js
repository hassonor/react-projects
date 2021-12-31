import {useHistory} from "react-router-dom";
import Card from "../../shared/components/UIElements/Card";
import MemberItem from "./MemberItem";
import "./MembersList.css"
import PermissionProvider from "../../shared/permissions/providers/permission-provider";
import Restricted from "../../shared/permissions/Restricted";
import {useContext} from "react";
import {AuthContext} from "../../shared/context/auth-context";


const MemberList = props =>{
    const auth = useContext(AuthContext);
    const history = useHistory();

    if(props.items.length === 0 ){
        return (
            <div className="center">
                <Card>
                    <h2> No Members were found.</h2>
                </Card>
            </div>
        )
    }

    return(
        <PermissionProvider permissions={auth.permissions}>
            <Restricted to="View Subscriptions">
        <>
        <ul className="member-list">
            <button style={{height:"40px",width:"150px",backgroundColor: "yellow"}}>All Members</button> &nbsp;&nbsp;
            <PermissionProvider permissions={auth.permissions}>
                <Restricted to="Add Subscriptions">
            <button style={{height:"40px",width:"150px"}}
                    onClick={()=> history.push("/add/member")}>Add Member</button>
                </Restricted>
            </PermissionProvider>
        </ul>
            <div className="content-container-users">
                {props.items.map(member=>{
                    return <MemberItem key={member._id} member={member} onDelete={props.onDeleteUser} />})}
            </div>
    </>
            </Restricted>
        </PermissionProvider>)
}

export default MemberList;
