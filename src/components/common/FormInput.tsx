interface FormInputProps {
    label: string;
    value: string;
    onChange: ((value: string) => void);
    autoFocus?: boolean;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    isError?: boolean;
    autoComplete?: string;
}

const FormInput = (props: FormInputProps) => {
    return (
        <>
            <input placeholder= {props.placeholder}
                   autoComplete={props.autoComplete}
                   value={props.value}
                   onChange={(e) => props.onChange(e.target.value)}
                   className={`body3 h-13.75 items-center flex-1 bg-[#FAFAFA] border-2 border-[#E4E4E4] rounded-lg px-4
                               ${props.autoFocus? `focus:border-[#6F6F6F]`:``}
                               focus:outline-none
                               `
            }
            />
        </>
    )
}

export default FormInput;