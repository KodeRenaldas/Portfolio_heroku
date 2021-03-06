import React from "react"
import styled from "styled-components"
import { Formik, useField, Form, Field } from "formik"
import * as Yup from "yup"
import axios from "axios"
import { useSelector } from "react-redux"

    const StyledForm = styled(Form)`
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.text};
    width: 100%;
    `
    const TextArea = styled(Field)`
    height: 100px;
    font-size: 1rem;
    font-family: inherit;
    resize: none;
    padding: 1em;
    border: none;
    width: 100%;
    &:focus {
        outline: none;
    }
    `
    const FormInput = styled.input`
    padding: 0;
    font-size: 1rem;
    padding: 1em;
    border: none;
    width: 100%;
    font-family: inherit;
    &:focus {
        outline: none;
    }
    `
    const FormError = styled.div`
    font-size: 1.25rem;
    font-family: inherit;
    color: red;
    position: absolute;
    z-index:5;
    `
    const Wrapper = styled.div`
    width: 100%;
    display: flex;
    `
    const Submit = styled.button`
    background: ${props => props.theme.accent};
    color: ${props => props.theme.primary};
    border: none;
    width: 100%;
    font-size: 1rem;
    padding: 0.5em;
    transition: transform 200ms ease-in-out;
    &: hover {
        transform: scale(1.01);
    }
    `
    const Header = styled.h4`
    text-align: center;
    margin: 0.25em 0;
    `

export default function AddComment(props) {
    const { loggedInUser } = useSelector(state => state.login)
    /* Replaced by user auth */
    const TextInput = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <FormInput {...field} {...props}/>
                {meta.touched && meta.error?(
                <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    const TextAreaF = ({label, ...props}) => {
        const [field, meta] = useField(props)
        return (
            <Wrapper>
                <TextArea {...field} {...props}/>
                {meta.touched && meta.error?(
                <FormError className="error">{meta.error}</FormError>): null}
            </Wrapper>
        )
    }
    return (
        <Formik initialValues={{comment: ""}}
        validationSchema={Yup.object({
            comment: Yup.string()
            .max(200, ">200")
            .required("*")
        })} 
        onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
                alert("Submitted")
                axios.post(`/record/addcomment/${props.id}`, {
                        name: `${loggedInUser.firstName} ${loggedInUser.lastName}`,
                        email: loggedInUser.email,
                        comment: values.comment,
                        date: new Date().toLocaleString()
                })
                .catch((err) => console.log(err))
                resetForm({values: ""})
                setSubmitting(false)
                props.update(true)
            }, 400)
          }}>
            <StyledForm>
                <Header>Comment:</Header>
                <TextAreaF 
                as="textarea"
                name="comment"
                label="Comment"
                placeholder="Comment"/>
                <Submit type="submit">Submit</Submit>
            </StyledForm>
        </Formik>
    )
}