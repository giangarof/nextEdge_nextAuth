import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-cyan-400 to-blue-400 text-center py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-md mb-4">
            Find Your Next Job
          </h1>

          <p className="text-lg text-cyan-50 mb-3">
            <span className="font-semibold">Technology</span> • Sales •
            Internships • Management • Accounting • and more
          </p>

          <p className="text-md text-cyan-100 mb-8">
            Full-time • Part-time • Temporary • Contract
          </p>

          <div className="mt-4">
            <SearchBar placeholder="Search for job titles, companies, or keywords..." />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
