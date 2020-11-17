import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonPage } from '@ionic/react';
import React, { useRef } from 'react';
import './Home.css';

interface card {
  msg: dataMsg
}

interface dataMsg {
  desc ?: string,
  title ?: string,
  content ?: string
}

const url: string = require("../../images/banner.png")
console.log(React as any)

const Home:React.FC<card> = (props:any) => {
  const { msg } = props
  return (
    <IonPage>
      <IonCard>
        <img src={url} alt="" />
        <IonCardHeader class="ion-inherit-color ios hydrated">

          <IonCardSubtitle
            role="heading"
            class="ion-inherit-color ios hydrated">
            { msg ? msg.desc : "组件未传值"}
          </IonCardSubtitle>

          <IonCardTitle
            role="heading"
            class="ion-inherit-color ios hydrated">
            { msg ? msg.title : "组件未传值"}
          </IonCardTitle>

        </IonCardHeader>

        <IonCardContent>
          { msg ? msg.content : "组件未传值"}
        </IonCardContent>
      </IonCard>
    </IonPage>
  )
}
export default Home;
