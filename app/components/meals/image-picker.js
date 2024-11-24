'use client'

import classes from './image-picker.module.css'
import {useRef, useState} from "react";
import Image from "next/image";

export default function ImagePicker(props) {

    const imageRef = useRef(null);
    const [image, setImage] = useState();

    const onClickHandler = () => {
        imageRef.current.click();
    }

    const handleImageChange = (evnet) => {
        const file = evnet.target.files[0];

        if(!file){
            setImage(null);
            return;
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setImage(fileReader.result);
        }

        fileReader.readAsDataURL(file);


    }

    return <div className={classes.picker}>
        <label htmlFor={props.name}>{props.label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!image && <p>No Image picked yet.</p>}
                {image && <Image src={image} alt={"The image selected by the user."} fill/>}
            </div>
            <input
                className={classes.input}
                type={"file"}
                id={props.name}
                accept={"image/png, image/jpeg"}
                name={props.name}
                ref={imageRef}
                onChange={handleImageChange}
                required/>
            <button className={classes.button} type={"button"} onClick={onClickHandler}>
                Pick an Image
            </button>
        </div>
    </div>
}
