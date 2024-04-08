import Button from "@/Components/Button/Button";
import Input from "@/Components/InputForm/InputForm";

const CompleteProfile = ({
  onChange = () => {},
  continueWith = () => {},
  inputData = {},
  isLoading = false,
}) => {
  const onLetsGo = (e) => {
    e.preventDefault();
    if (!inputData?.first_name) {
      continueWith("first_name");
    } else if (
      !inputData?.last_name ||
      (inputData?.first_name && inputData?.last_name)
    ) {
      continueWith("last_name");
    }
  };

  return (
    <div className="md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center">
      <div className="w-[343px] max-w-[100%] p-6 py-7 shadow-md rounded-xl border border-[#eee] bg-white">
        <h2 className="text-xl font-semibold text-[#131517] mb-5">
          Complete Your Profile
        </h2>
        <p className="text-sm text-[#595C5C] font-medium mb-6">
          Enter your name so your friends can recognise you.
        </p>
        <form onSubmit={onLetsGo}>
          <Input
            autoFocus
            onChange={onChange}
            val={inputData?.first_name}
            name="first_name"
            placeholder="First Name"
            inputCls="input mb-4"
            label="First Name"
            maxLength={40}
            labelCls="font-medium block relative mb-2 text-sm text-[#131517] break-all"
          />
          <Input
            onChange={onChange}
            val={inputData?.last_name}
            name="last_name"
            placeholder="Last name"
            inputCls="input"
            label="Last Name"
            maxLength={40}
            labelCls="font-medium block relative mb-2 text-sm text-[#131517] break-all"
          />
          <Button
            showLoader={false}
            disabled={isLoading}
            className="btn-dark w-full mt-7"
          >
            Let&apos;s Go
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfile;
