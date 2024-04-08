import Button from "@/Components/Button/Button";
import Svg from "../../../../public/Assets/Svg";
import FileUploader from "@/Components/FileUploader/FileUploader";
import Input from "@/Components/InputForm/InputForm";
import DesignFields from "@/Components/DesignFields/DesignFields";
import useBadgeStore from "@/Store/useBadgeStore";
import UploadLoader from "@/Components/Loader/UploadLoader";
import useCommonStore from "@/Store/useCommonStore";
import useCreateEvent from "@/CustomHook/useCreateEvent";


const Badges = ({ onChangeFile = () => { }, onFilter = () => { }, filteredCat = [], onChange = () => { }, badgeInputData = {} }) => {

    const { categories, badgeConfig } = useBadgeStore();
    const { isLoading } = useCommonStore();
    const { handleClickOpen, openProfile, btnRef, modalRef, categoryRef, categoryDdlRef, handleCategoryOpen, openCategory,onTabChange } = useCreateEvent();

    return (
        <div className='GeneralMBadge'>
            <p className="text-[#969498] text-[16px] mb-1 font-medium">Upload Background Image</p>
            <div className='relative bg-[#EFEFF0] border border-dashed border-[#D4D4D4] p-7 rounded-lg text-center mt-3'>
                {isLoading ? <UploadLoader /> : null}
                <p className='text-[#595C5C] text-base'>Drag & drop or click here to upload.</p>
                <p className='text-[#969498] text-sm pb-0'>Image size should be 1000x2000</p>
                <FileUploader
                    avatar={badgeInputData?.image}
                    cb={(file) => { onChangeFile(file, "mImg") }}
                    id="chooseImage"
                    cls='absolute w-full h-full opacity-0 z-10 cursor-pointer overflow-hidden text-[0] left-0 top-0'
                    imgCls='absolute w-full h-full overflow-hidden cursor-pointer hidden'
                />
            </div>

            <div className="w-full mt-4">
                <h3 className="text-[#969498] text-[16px] mb-1 font-medium">Badge Template Name</h3>
                <Input name={"title"} val={badgeInputData?.title} type="text" inputCls="inputBadge" placeholder="Enter name" autoFocus onChange={onChange} />
            </div>
            
            {badgeConfig?.config?.mbadge?.font_type?.length ? <div className="w-full mt-3">
                <h3 className="text-[#969498] text-[16px] mb-1 font-medium">Font Type</h3>
                <div className="relative">
                    <Button buttonRef={btnRef} type={'button'} className="dropdownListCommon" onClick={handleClickOpen}>
                        {badgeInputData?.font || "Choose Font"}
                        {Svg().SingleSelect}
                    </Button>
                    {openProfile ? <div ref={modalRef} className="absolute w-full top-[100%] z-10">
                        <ul className="Fontdropdown" style={{ padding: '5px' }}>
                            {badgeConfig?.config?.mbadge?.font_type?.map((e) => {
                                return (
                                    <li onClick={() => {
                                        onChange({ target: { name: "font", value: e?.value } });
                                        handleClickOpen();
                                    }} className="hover:bg-[#f0f0f0] rounded-md" style={{ padding: '4px 8px' }} key={e?.value}>{e?.label}</li>
                                )
                            })}
                        </ul>
                    </div> : null}
                </div>
            </div> : null}

            <div className="w-full mt-3">
                <h3 className="text-[#969498] text-[16px] mb-1 font-medium">Category Associated</h3>
                <div className="relative">
                    <Button buttonRef={categoryRef} type={'button'} className="dropdownListCommon" onClick={handleCategoryOpen}>
                        Choose Category
                        {Svg().SingleSelect}
                    </Button>
                    {openCategory ? <div ref={categoryDdlRef} className="absolute w-full z-10 mt-2">
                        <ul className="boxShadow rounded-md bg-white w-full p-1">
                            {categories?.length ? categories?.map((elem) => {
                                return (
                                    <Button onClick={() => onFilter(elem?.id, false)} key={elem?.id} type="button" className=" text-left text-gray-700 rounded flex justify-between items-center p-1 text-sm w-full hover:bg-[#f0f0f0] stroke-[#131517]">{elem?.title}
                                        {filteredCat?.includes(elem?.id) ? Svg().Checkbox : null}
                                    </Button>
                                )
                            }) : null}
                        </ul>
                    </div> : null}
                </div>
            </div>
            <div className="w-full flex items-center mt-1">
                <div className="tags-input">
                    {categories?.length ? categories?.filter((elem) => filteredCat.includes(elem?.id) && elem)?.map((e) => {
                        return (
                            <span className="tag" key={e?.id}>
                                {e?.title} <Button onClick={() => onFilter(e?.id, false)} type="button">{Svg().CloseIcon}</Button>
                            </span>
                        )
                    }) : null}
                </div>
            </div>
        </div>
    )
}

const CreateBadge = ({ dataAsProps = {} }) => {
    return (
        <DesignFields {...dataAsProps} />
    )
}

export { Badges, CreateBadge };