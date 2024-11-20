import { ChangeEvent, useState } from 'react'

export type useInputController = {
    value: string;
    setValue: (value: string) => void;
    handleValueChange: (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const useInputController = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    }

    return { value, setValue, handleValueChange }
}