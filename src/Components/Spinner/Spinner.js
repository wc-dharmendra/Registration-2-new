const Spinner = ({
    width = '10',
    height = '10',
    color = '#000'
}) => {
    return (
        <div className={`flex gap-2 inline-block w-${[width + 'px']} h-${[height + 'px']} rounded-full border-2 border-[rgba(255,255,255,0.5)] border-[2px] border-t-[${color}] animate-spin`}></div>
    )
}

export default Spinner;