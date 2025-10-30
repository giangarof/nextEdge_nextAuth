import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";
const SubmitMessageBtn = () => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        type="submit"
        className="bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-700 transition"
        disabled={pending}
      >
        {pending ? "Sending..." : "Send Message"}
      </button>
    </>
  );
};

export default SubmitMessageBtn;
