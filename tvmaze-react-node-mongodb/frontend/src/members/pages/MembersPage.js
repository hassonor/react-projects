import {useHttpClient} from "../../shared/hooks/http-hook";
import {useEffect, useState} from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import MemberList from "../components/MembersList";

const MembersPage = () =>{
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [loadedMembers, setLoadedMembers] = useState();
    useEffect(()=>{
        const fetchMembers = async () =>{
            try{
                const response = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/members`)
                setLoadedMembers(response);

            }
            catch(err){}
        }
        fetchMembers();
    },[sendRequest])

    const memberDeletedHandler = (deleteMemberId) =>{
        setLoadedMembers(prevUsers => prevUsers.filter(member => member._id !==  deleteMemberId));
    }

    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <div className="center"><LoadingSpinner/></div> }
            {!isLoading && loadedMembers && <MemberList items={loadedMembers} onDeleteUser={memberDeletedHandler} />}
        </>
    )
}

export default MembersPage;
