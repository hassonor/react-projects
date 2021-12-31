import UsersList from "../components/UsersList";
import {useEffect, useState} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {useHttpClient} from "../../shared/hooks/http-hook";


const UsersPage = () => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=>{
        const fetchUsers = async () =>{
            try{
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`)
                setLoadedUsers(response);

            }
            catch(err){}
        }
        fetchUsers();
    },[sendRequest])

    const userDeletedHandler = (deleteUserId) =>{
        setLoadedUsers(prevUsers => prevUsers.filter(user => user._id !==  deleteUserId));
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner/></div> }
            {!isLoading && loadedUsers && <UsersList items={loadedUsers} onDeleteUser={userDeletedHandler} />}
        </>
    )
}

export default UsersPage;
