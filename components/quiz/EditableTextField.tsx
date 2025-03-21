import { useState, useEffect, useRef } from 'react'
import { Input } from '../ui/input'

interface EditableTextProps {
    initialText: string
    onSave: (text: string) => void
    className?: string
}

export function EditableTextField({ initialText, onSave, className = '' }: EditableTextProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(initialText)
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus()
        }
    }, [isEditing])

    const handleSave = () => {
        onSave(text)
        setIsEditing(false)
    }

    if (isEditing) {
        return (
            <Input
                ref={inputRef}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                className={className}
            />
        )
    }

    return (
        <span
            onClick={() => setIsEditing(true)}
            className={`cursor-pointer hover:bg-gray-100 rounded px-1 ${className}`}
        >
            {text}
        </span>
    )
}
