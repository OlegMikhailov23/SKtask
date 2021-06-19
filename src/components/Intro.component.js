import React from 'react';
import styled from 'styled-components';

import logo from '../assets/images/logo.svg'

const IntroWrapper = styled.div`
width: 66%;
`

const IntroLogo = styled.div`
width: 475px;
height: 70px;
margin-bottom: 40px;
background-image: url(${logo});
background-repeat: no-repeat;
background-position: center;
background-size: 100% 100%;
overflow: visible;
`

const IntroTitle = styled.h1`
  margin-bottom: 40px;
  font-family: 'SF UI Display';
  font-size: 1.5rem;
  line-height: 36px;
  font-weight: 600;
  color: #353238;
`

const IntroText = styled.article`
& p {
font-family: 'Open Sans';
font-size: 14px;
font-weight: 400;
line-height: 150%;
color: #353238;
padding: 0;
margin: 0;
margin-bottom: 20px;
}
& p:first-child {
padding-right: 50px;
}
`

const Intro = () => {


    return (
        <IntroWrapper>
            <IntroLogo>
            </IntroLogo>
            <IntroTitle>
                Оставьте заявку и станьте частью нашей команды
            </IntroTitle>
            <IntroText>
                <p>Компания SK Design приглашает к взаимовыгодному сотрудничеству креативных дизайнеров, архитекторов и
                    декораторов, дизайн-бюро и интерьерные студии — все, кто дизайн интерьера сделали своим
                    призванием.</p>
                <p>Партнерство мы видим как доверительные отношения, основанные на честности реализации бизнес идей в
                    сфере создания и продаж современной, качественной, удобной, функциональной и эксклюзивной
                    мебели.</p>
                <p>Ознакомиться с проектами можете в нашем портфолио. Если Вы оформляете интерьеры жилых или
                    коммерческих помещений — мы с радостью поможем Вам: составим уникальные условия сотрудничества,
                    предоставим 3D модели (уточняйте у менеджеров) и разработаем коммерческое предложение к Вашему
                    проекту или изображениям.</p>
            </IntroText>

        </IntroWrapper>
    )
}

export default Intro;
