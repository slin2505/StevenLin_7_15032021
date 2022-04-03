import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, getPosts } from '../../actions/post.actions';
import { timestampParser } from '../Utils';

const PostForm = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState('');
    const [postUpload, setPostUpload] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const handlePost = async() =>{
        if (text || postUpload || video){
            const data = new FormData();
            data.append('userId', userData.id);
            data.append('content', text);
            data.append('video', video)
            if (file){
                data.append('upload', file);
            };
            await dispatch(createPost(data));
            dispatch(getPosts());
            cancelPost();
        } else{
            alert('Veuillez rentrer un message');
        };
    };

    const handlePicture = (e) =>{
        setPostUpload(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    };

    const cancelPost = () =>{
        setText('');
        setPostUpload('');
        setVideo('');
        setFile('');
    };

    useEffect(() =>{
        if (userData !== undefined){
            setIsLoading(false);
        };
        const handleVideo = () =>{
            let findLink = text.split(' ');
            for (let i = 0; i < findLink.length; i++){
                if(findLink[i].includes('https://www.youtube') || findLink[i].includes('https://youtube')){
                    let embed = findLink[i].replace('watch?v=', 'embed/');
                    setVideo(embed.split('&')[0]);
                    findLink.splice(i, 1);
                    setText(findLink.join(' '));
                    setPostUpload('');
                }
            }
        }
        handleVideo();
    }, [userData, text, video]);

    return (
        <div className='post-container'>
            {isLoading ?(
                <p className='card-loading'>Chargement en cours ...</p>
            ) : (
                <>
                    <div className='post-form'>
                        <textarea
                            name='content'
                            id='content'
                            placeholder='Quoi de neuf ?'
                            onChange={e => setText(e.target.value)}
                            value={text}
                        />
                        {text || postUpload || video.length > 20 ?(
                            <li className='card-container'>
                                <div className='card-left'>
                                    <img src={userData.upload} alt='user-pic' />
                                </div>
                                <div className='card-right'>
                                    <div className='card-header'>
                                        <div className='pseudo'>
                                            <h3>{userData.first_name} {userData.last_name}</h3>
                                        </div>
                                        <span>{timestampParser(Date.now())}</span>
                                    </div>
                                    <div className='content'>
                                        <p>{text}</p>
                                        {postUpload && <img src={postUpload} alt='fakePic' />}
                                        {video && <iframe width='500' height='300' src={video} frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen title='videoTemplate'/>}
                                    </div>
                                </div>
                            </li>
                        ) : null}
                         <div className='footer-form'>
                            <div className='icon'>
                                {video !== undefined && (
                                    <>
                                        <img src='./img/icons/picture.svg' alt='pictureIcon' />
                                        <input 
                                            type='file' 
                                            id='file-upload' 
                                            name='file' 
                                            accept='.jpg, .jpeg, .png, .gif' 
                                            onChange={(e) => handlePicture(e)}
                                        />
                                    </>
                                )}
                                {video && (
                                    <button onClick={() => setVideo('')}>Supprimer video</button>
                                )}
                            </div>
                            <div className='btn-send'>
                                {text || postUpload || video.lenght > 20 ?(
                                    <button className='cancel' onClick={cancelPost}>Annuler message</button>
                                ): null}
                                <button className='send' onClick={handlePost}>Envoyer</button>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    );
};

export default PostForm;