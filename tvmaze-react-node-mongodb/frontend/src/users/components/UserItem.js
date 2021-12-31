import './UserItem.css';
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import {useContext, useState} from "react";
import {useHttpClient} from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import {AuthContext} from "../../shared/context/auth-context";

const UserItem = ({user, onDelete}) => {
    const {isLoading, error, sendRequest, clearError} = useHttpClient();
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const auth = useContext(AuthContext);

    const showDeleteWarningHandler = () => {
        setShowConfirmModal(true);

    }

    const cancelDeleteHandler = () =>{
        setShowConfirmModal(false);
    }

    const confirmDeleteHandler = async() =>{
        setShowConfirmModal(false);
        try{
            await sendRequest(
                `${process.env.REACT_APP_BACKEND_URL}/users/${user._id}`,
                'DELETE',
                null,
                {
                    Authorization: 'Bearer ' + auth.token
                }
            );
            onDelete(user._id);
        }
        catch(err){

        }

    }
    return (
        <>
            <ErrorModal error={error} onClear={clearError}/>
            <Modal
                show={showConfirmModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="user-item__modal-actions"
                footer={
                    <>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </>
                } >
                <p>Do you want to proceed and delete this movie? </p>
            </Modal>
      <div className="user-item">
                <Card className="user-item__content">
                    {isLoading &&<LoadingSpinner asOverlay />}
                <div className="user-item__info">
                    <h2><i>{user.name}</i> </h2>
                </div>
                <div className="user-item__info">
                    <h3>Username:</h3><span> {user.username}</span>
                </div>
                <div className="user-item__info">
                   <h3>Created Data: </h3><span>{user.createdData}</span>
                </div>
                <div className="user-item__info">
                    <h3>Permissions: </h3> <span>{user.permissions.toString()}</span>
                </div>
                    <Button   to={`/users/${user._id}`}>EDIT</Button>
                    <Button danger onClick={showDeleteWarningHandler}>DELETE</Button>
                </Card>
            </div>
            </>
    );
};


export default UserItem;
