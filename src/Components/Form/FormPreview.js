import React from 'react'
import Input from '../InputForm/InputForm'

function FormPreview({ arr = [] }) {
    return (
        arr?.length ?
            arr?.map(({ label, options, type, required }, index) => (
                <div key={label + index?.toString()}>
                    <div className="flex gap-2 py-3 items-center 2">
                        {!options?.length ? <div className="question grow max-w-full">
                            {type === "checkbox" ?
                                <div className="inline-flex gap-2 items-center">
                                    <input className="accent-[#000] w-[15px] h-[15px]" type={'checkbox'} />
                                    <label className="font-medium relative text-sm text-[#595C5C] break-all">{label}</label>
                                </div>
                                :
                                <Input
                                    inputCls="input w-full"
                                    placeholder={label}
                                    label={label}
                                    isRequired={required}
                                />}
                        </div> : null}
                        {options?.length ? <div className="w-full">
                            <label className="font-medium block relative mb-1 text-sm text-[#595C5C] break-all">{label}</label>
                            <select className="input w-full">
                                {(options?.length) ? options.map(({ text, value }, i) => {
                                    return (
                                        <option key={text + i?.toString()} value={value}>{text}</option>
                                    )
                                }) : null}
                            </select>
                        </div> : null}
                    </div>
                </div>
            ))
            : null)
}

export default FormPreview