import {useState} from "react";
import axios from "axios";

const AddCommentForm = ({articleName, setArticleInfo}) => {

    const [username, setUsername] = useState('')
    const [commentText, setCommentText] = useState('')

    const addComment = async () =>{

        try {
            const resp = await axios.post(process.env.REACT_APP_BACKEND_URL +`/articles/${articleName}/add-comment`, {
                username: username,
                text: commentText
            })

            setArticleInfo(resp.data);
        }
        catch(err){
            console.log(err);
        }
        setUsername("");
        setCommentText("");
    }

    return (<div id="add-comment-form">
        <h3>Add a Comment</h3>
        <label>
            Name:
            <input type="text" value={username} onChange={(e) =>
                setUsername(e.target.value)}/>
        </label>
        <label>
            Comment:
            <textarea rows="4" cols="50" value={commentText} onChange={(e) =>
                setCommentText(e.target.value)}/>
        </label>
        <button onClick={()=>{addComment()}}>Add Comment</button>
    </div>)
}

export default AddCommentForm;
