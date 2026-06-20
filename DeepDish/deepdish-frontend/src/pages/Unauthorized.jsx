export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-black text-red-600">403</h1>
      <p className="text-xl mt-4">Oops! You don't have access to this area.</p>
      <a href="/" className="mt-6 text-orange-500 underline">Return Home</a>
    </div>
  );
}