import { IonItem, IonInput, IonIcon} from '@ionic/react';
import React, { useRef } from 'react';

interface inputMsg {
    theStyle?: object,
    type?: string,
    msg?: string | number,
    hasIcon?: boolean,
    placeholder?: string | undefined,
    icon?: string,
    activeFn?: (...arr: any) => any | void,
    width?: string | undefined
}
const EL:React.FC<inputMsg> = (props:any) =>{
    return (
        <IonItem>
            <IonInput
                style = {props.theStyle}
                className = 'lxg-input'
                onClick = { ()=> console.log("点击到了屏幕了") }
                placeholder = {props.placeholder ? props.placeholder : ''}
                type = {props.type ? props.type : 'text'}
                value = {props.msg ? props.msg : ''}>
            </IonInput>
            <IonIcon
                name='alert-outline'>
            </IonIcon>
        </IonItem>
    )
}
export default  EL
