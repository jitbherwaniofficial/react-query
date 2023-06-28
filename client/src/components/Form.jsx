import {React,useState} from 'react';
import {useMutation,useQueryClient} from "@tanstack/react-query";

const createtodo = (text) => {
    return () => fetch('http://localhost:8000/todo/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({title:text})
    })
}

const Form = () => {
    const [text, setText] = useState("");
    const queryclient = useQueryClient()
    const todoMutation = useMutation(createtodo(text),{
        onSuccess: () => {
            console.log('Success');
            queryclient.invalidateQueries(['todo'])
        },
        onError: () => {
            console.log("Error");
        }
    })
    return (
        <div>
            <input onChange={(e) => setText(e.target.value)} value={text} type="text"  />
            <button onClick={e => todoMutation.mutate()}>create</button>
        </div>
    )
}

export default Form;