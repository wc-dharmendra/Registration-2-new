
import Button from '@/Components/Button/Button';
import Input from '@/Components/InputForm/InputForm';

const LinkEmail = ({ onSkip = () => { }, continueWith = () => { }, onChange = () => { }, inputData = {}, isLoading = false }) => {
  return (
    <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
      <div className='w-[343px] max-w-[100%] p-6 shadow-md rounded-xl border border-[#eee] bg-white'>
        <h2 className='text-xl font-semibold text-[#131517] mb-4'>Link Email</h2>
        <p className='text-sm text-[#595C5C] mb-3'>Link your email to receive reminders via email and find your friends</p>
        <form>
          <Input autoFocus onChange={onChange} val={inputData?.email} name='email' placeholder='someone@email.com' inputCls='input' label='Email' />
          <Button disabled={isLoading} type='button' className='btn-dark w-full mt-6' onClick={() => continueWith("linkWithEmail")}>
            Continue
          </Button>
          <Button type='button' onClick={() => { onSkip() }} className='text-[#969498] text-base bg-transparent semibold mt-3 block mx-auto hover:text-[#595C5C] transition-all'>Skip</Button>
        </form>
      </div>
    </div>
  )
};

export default LinkEmail;
