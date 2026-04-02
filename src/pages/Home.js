function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-5xl font-bold text-orange-600 mb-4">
        Welcome to KumbhPrashad 🙏
      </h1>

      <p className="text-lg text-gray-600 max-w-xl">
        Get blessed prashad from holy places directly to your home.
      </p>

      <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600">
        Explore Now
      </button>
    </div>
  );
}

export default Home;