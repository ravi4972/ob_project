const BookListShimmer = () => {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="border rounded-lg p-4 shadow-sm bg-white w-80 h-80 animate-pulse bg-gray-100"
        ></div>
      ))}
    </>
  );
};

export default BookListShimmer;
