import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    onChange: (newText: string) => void
}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    let [editMode, setEditMode] = useState(false)
    let [newText, setNewText] = useState('')
    const changeTextDoubleClick = () => {
        setEditMode(!editMode)
        setNewText(props.title)
    }
    const changeTextFromEnter = (event: ChangeEvent<HTMLInputElement>) => {
        setNewText(event.currentTarget.value)
    }
    const activateViewMode = () => {
        setEditMode(!editMode)
        props.onChange(newText)
    }
    return (
        editMode ?
            <input onChange={changeTextFromEnter}
                   autoFocus onBlur={activateViewMode} value={newText}/> :
            <span onDoubleClick={changeTextDoubleClick}>{props.title}</span>
    )
});


