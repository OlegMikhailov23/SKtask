import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from "axios";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import {useDispatch, useSelector} from "react-redux";
import store from "../../redux/store";
import {
    setName,
    setPhone,
    setEmail,
    setCity,
    setFrom,
    setProfile,
    setOrganization,
    setRecipient,
    clearState
} from "../../redux/form-reducer";


import './Form.component.scss';


const FormWrapper = styled.div`
position: relative;
top: -40px;
width: 26%;
padding: 40px 30px;
background: #FFFFFF;
box-shadow: 0px 5px 20px rgba(53, 50, 56, 0.14);
border-radius: 8px;
@media (max-width: 960px) {
width: 70%;
}
`

const FormRow = styled.div`
display: flex;
justify-content: space-between;
flex-direction: row;
flex-wrap: nowrap;
margin-bottom: 20px;
`

const ButtonDisabled = styled.button`
display: block;
width: 100%;
padding-top: 18px;
padding-bottom: 18px;

font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 14px */

text-align: center;

color: #828282;

background: #E3E3E3;
border-radius: 8px;
outline: none;
border: none;
`

const Button = styled.button`
display: block;
width: 100%;
min-height: 50px;

font-family: 'Open Sans';
font-style: normal;
font-weight: 600;
font-size: 14px;
line-height: 100%;
/* identical to box height, or 14px */

text-align: center;

color: #ffffff;

background: #0086A8;
border-radius: 8px;
outline: none;
border: none;
cursor: pointer;
&:hover {
transition: ease-in 0.2s;
background-color: #007693;
&:active {
background-color: #00657E;
}
}
`

const Form = () => {
    const dispatch = useDispatch();

    const [cities, setCities] = useState(null);
    const [sources, setSources] = useState(null)

    const {userName, email, profile, city, organization, recipient, from, phone} =
        useSelector((state) => state.editForm);

    const [isFormReady, setIsFormReady] = useState(false);

    const [isSending, setIsSending] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        check();
    }, [errors, phone, userName, email, profile]);


    const getData = async () => {
        try {
            const responseCities = await axios.get('data/cities.json');
            const responseSources = await axios.get('data/sources.json');
            setCities(responseCities.data);
            setSources(responseSources.data);
        } catch (error) {
            throw Error(error);
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const check = () => {
        let count = 0;
        for (let key in errors) {
            if (Boolean(errors[key])) {
                count += 1
            }
        }
        if (count === 0 && userName && phone && email && profile) {
            setIsFormReady(true)
        } else {
            setIsFormReady(false)
        }

    }

    const handleNameChange = (e) => {
        const target = e.target.value;
        dispatch(setName(target));
        if (!target || target.length < 2) {
            setErrors({...errors, userName: '?????????????? ??????'});
        } else {
            setErrors({...errors, userName: ''});
        }
    }

    const handlePhoneChange = (e) => {
        const target = e.target.value;
        const req = new RegExp(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/).test(target);
        if (!req) {
            setErrors({...errors, phone: '?????????????? ??????????'});
        } else {
            setErrors({...errors, phone: ''});
            dispatch(setPhone(target));
        }
    }

    const handleEmailChange = (e) => {
        const target = e.target.value;
        const req = new RegExp(/^.+@.+\..+/).test(target);
        if (!req) {
            setErrors({...errors, email: '?????????????? email!'});
        } else {
            setErrors({...errors, email: ''});
            dispatch(setEmail(target));
        }
    }

    const handleProfileChange = (e) => {
        const target = e.target.value;
        if (!target || target.length < 2) {
            setErrors({...errors, profile: '?????????????? ????????????'});
        } else {
            setErrors({...errors, profile: ''});
            dispatch(setProfile(target));
        }
    }

    const sendHandler = (e) => {
        e.preventDefault();
        setIsSending(true);
        setTimeout(() => {
            document.getElementById('main-form').reset();
            setIsSending(false);
            setIsFormReady(false);
            setErrors({});
            console.log(JSON.stringify(store.getState(), null, 2));
            dispatch(clearState(''))
        }, 2000)
    }


    return (
        <FormWrapper>
            <form id='main-form'>
                <FormRow>
                    <TextField
                        className={'field__half-width'}
                        required
                        id="outlined-required"
                        label="???????? ??????"
                        variant="outlined"
                        value={userName}
                        type={'text'}
                        onChange={(e) => {
                            handleNameChange(e)
                        }
                        }
                        error={Boolean(errors?.userName)}
                        helperText={errors?.userName}
                    />
                    <TextField
                        className={'field__half-width'}
                        required
                        id="outlined-required"
                        label="?????????? ????????????????"
                        variant="outlined"
                        value={phone}
                        type={'tel'}
                        onChange={(e) => {
                            dispatch(setPhone(e.target.value));
                            handlePhoneChange(e)
                        }
                        }
                        error={Boolean(errors?.phone)}
                        helperText={errors?.phone}
                    />
                </FormRow>
                <FormRow>
                    <TextField
                        className={'field__half-width'}
                        required
                        id="outlined-required"
                        label="E-mail"
                        variant="outlined"
                        value={email}
                        type={'email'}
                        onChange={(e) => {
                            dispatch(setEmail(e.target.value));
                            handleEmailChange(e)
                        }
                        }
                        error={Boolean(errors?.email)}
                        helperText={errors?.email}
                    />
                    <TextField
                        className={'field__half-width'}
                        required
                        id="outlined-required"
                        label="???????????? ???? ??????????????"
                        variant="outlined"
                        type={'text'}
                        value={profile}
                        onChange={(e) => {
                            dispatch(setProfile(e.target.value));
                            handleProfileChange(e)
                        }
                        }
                        error={Boolean(errors?.profile)}
                        helperText={errors?.profile}
                    />
                </FormRow>
                <TextField
                    className={'field__full-width'}
                    id="outlined-select-currency"
                    select
                    label="???????????????? ??????????"
                    variant="outlined"
                    value={city}
                    onChange={(e) => {
                        dispatch(setCity(e.target.value));
                    }
                    }
                    required
                >
                    {cities?.map((it, idx) => <MenuItem key={it.id} value={it.id}>{it.name}</MenuItem>)}
                </TextField>
                <TextField
                    className={'field__full-width margin-off'}
                    id="outlined-required"
                    label="???????????????? ??????????????????????/????????????"
                    variant="outlined"
                    value={organization}
                    onChange={(e) => {
                        dispatch(setOrganization(e.target.value));
                    }
                    }
                    type={'text'}
                />
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>???????????????? ???????????????????????????? ????????</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                        <TextField
                            className={'field__full-width'}
                            id="outlined-required"
                            label="????????????????????"
                            variant="outlined"
                            value={recipient}
                            onChange={(e) => {
                                dispatch(setRecipient(e.target.value));
                            }
                            }
                            type={'text'}
                        />
                        <TextField
                            className={'field__full-width'}
                            id="outlined-select-currency"
                            select
                            label="???? ???????? ???????????? ?????? ???????"
                            variant="outlined"
                            value={from}

                            onChange={(e) => {
                                dispatch(setFrom(e.target.value));
                            }
                            }
                        >

                            {sources?.map((it, idx) => <MenuItem key={idx} value={it}>{it}</MenuItem>)}
                        </TextField>

                    </AccordionDetails>
                </Accordion>
                {!isFormReady && <ButtonDisabled type="submit" disabled>?????????????????? ????????????</ButtonDisabled>}
                {isFormReady && <Button type="submit"
                                        onClick={sendHandler}>{!isSending ? '?????????????????? ????????????' :
                    <CircularProgress/>}</Button>}

            </form>
        </FormWrapper>
    )
}

export default Form;
