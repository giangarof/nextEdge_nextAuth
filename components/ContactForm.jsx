const ContactForm = ({job}) => {
    return ( <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact About This Job</h3>
      <form  className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
        //   value={formData.name}
        //   onChange={handleChange}
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <input
          type="email"
          name="email"
        //   value={formData.email}
        //   onChange={handleChange}
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          required
        />
        <textarea
          name="message"
        //   value={formData.message}
        //   onChange={handleChange}
          placeholder="Your Message"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
          rows={4}
          required
        ></textarea>
        <button
          type="submit"
          className="bg-cyan-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-700 transition"
        >
          Send Message
        </button>
      </form>
    </div> );
}
 
export default ContactForm;