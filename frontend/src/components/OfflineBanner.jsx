export default function OfflineBanner() {

    return (
    <div className={`flex justify-center items-start pt-14 w-full h-screen`}>
        <div className="bg-red-500 text-white text-center p-2 text-sm">
            ⚠️ You are offline. Some features may not work.
        </div>
    </div>
  );
}
