

import Button from '@/Components/Button/Button';
import Input from '@/Components/InputForm/InputForm';
import SearchableSelect from '@/Components/SearchableSelect/SearchableSelect';
import Utils from '@/Utils/Utils';

const LinkPhone = ({ continueWith = () => { }, isFocused = () => { }, setIsFocused = () => { }, onChange = () => { }, inputData = {}, onSkip = () => { },isLoading=false }) => {

  return (
    <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
      <div className='w-[343px] max-w-[100%] p-5 shadow-md rounded-xl border border-[#eee] bg-white'>

        <h2 className='text-xl font-semibold text-[#131517] mb-4'>Link Whatsapp Number</h2>
        <p className='text-sm text-[#595C5C] mb-3 font-medium leading-6'>Link your WhatsApp number to receive reminders</p>

        <form onSubmit={(e)=>{e.preventDefault();continueWith("linkWithPhone")}}>
          <p className='text-sm text-[#131517] mb-3 font-medium'>Whatsapp Number</p>
          <div className={`flex w-full border rounded-lg h-[40px] relative ${isFocused ? 'border-[#000]' : 'border-[#EBECED]'}`}>
            <SearchableSelect options={Utils?.countryCode} onChange={onChange} value={inputData?.dial_code} cls='border-r max-w-[90px] grow-0 shrink-0' />
            <Input autoFocus name='phone' onChange={onChange} val={inputData?.phone} placeholder='982809820' inputCls='w-full rounded-md h-[38px] px-2 focus:outline-none' onFocus={() => setIsFocused(true)} maxLength={15} onBlur={() => setIsFocused(false)} />
          </div>
          <Button disabled={isLoading} className='btn-dark w-full mt-6'>
            Continue
          </Button>
        </form>
        <Button type='button' onClick={() => onSkip()} className='text-[#969498] text-base bg-transparent mt-4 mx-auto block hover:text-[#595C5C] transition-all font-semibold'>Skip</Button>
      </div>
    </div>
  )
};

export default LinkPhone;
