import React from 'react';
import s from './MyPosts.module.css';
import {Post} from "./Post/Post";
import {ProfilePropsType} from "./MyPostsContainer";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validators/validators";
import {TextArea} from "../../common/formControls/formControl";

type FormDataType = {
    text: string
}

const maxLength =  maxLengthCreator(10);

const MyPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {

    return (
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field placeholder={'Write your new post'}
                           name={'text'}
                           component={TextArea}
                           validate={[requiredField, maxLength]}/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </form>
    );
};


const PostReduxForm = reduxForm<FormDataType>({form: 'text'})(MyPostForm)


export const MyPosts = (props: ProfilePropsType) => {

    let getPostData = props.profilePage.postData.map((ev, id) => {
        return (
            <Post key={id} name={ev.name} message={ev.message} likes={ev.likes}/>
        )
    })

    const addPost = (newTextValue: FormDataType) => {
        props.addPostCallback(newTextValue.text);
    }

    return (
        <div className={s.posts}>
            <h3>My posts</h3>
            <PostReduxForm onSubmit={addPost}/>
            {getPostData}
        </div>
    )
}