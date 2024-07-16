export default function Register() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-200">
      <header className="p-5">
        <center>
          <h1 className="text-3xl font-bold">
            <i className="fas fa-smile"></i> RAN CHAT
          </h1>
          <h2 className="text-3xl font-bold">Register</h2>
        </center>
      </header>
      <main className="flex flex-col items-center w-full max-w-md p-5 bg-white rounded shadow-md">
        <form action="chat.html" className="w-full">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">
              Room
            </label>
            <select name="room" id="room" className="select select-bordered w-full max-w-xs">
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Join Chat
          </button>
        </form>
      </main>
    </div>
  );
}
