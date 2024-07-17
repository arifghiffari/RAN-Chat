import Nav from "../components/Nav";

export default function Chat() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Nav />
      <main className="flex flex-1">
        <aside className="w-1/4 bg-white p-4">
          <h3 className="text-lg font-semibold flex items-center">
            <i className="fas fa-comments mr-2"></i> Room Name:
          </h3>
          <h2 id="room-name" className="text-xl font-bold mb-4">
            JavaScript
          </h2>
          <h3 className="text-lg font-semibold flex items-center">
            <i className="fas fa-users mr-2"></i> Users
          </h3>
          <ul id="users" className="list-disc list-inside">
            <li>Brad</li>
            <li>John</li>
            <li>Mary</li>
            <li>Paul</li>
            <li>Mike</li>
          </ul>
        </aside>
        <div className="flex-1 bg-white p-4 overflow-y-auto">
          <div className="message bg-gray-100 p-2 rounded mb-4">
            <p className="meta text-sm text-gray-500">
              Brad <span className="ml-2">9:12pm</span>
            </p>
            <p className="text mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.</p>
          </div>
          <div className="message bg-gray-100 p-2 rounded mb-4">
            <p className="meta text-sm text-gray-500">
              Mary <span className="ml-2">9:15pm</span>
            </p>
            <p className="text mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, repudiandae.</p>
          </div>
        </div>
      </main>
      <div className="bg-white p-4">
        <form id="chat-form" className="flex">
          <input id="msg" type="text" placeholder="Enter Message" required autoComplete="off" className="flex-1 border border-gray-300 p-2 rounded-l" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600">
            <i className="fas fa-paper-plane"></i> Send
          </button>
        </form>
      </div>
    </div>
  );
}
