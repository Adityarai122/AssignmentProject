import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="bg-red-50 p-4 rounded-full mb-6 animate-bounce">
        <AlertCircle className="w-16 h-16 text-red-500" />
      </div>
      
      <h1 className="text-4xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        The page you are looking for doesn't exist or has been moved. 
        It looks like our hiring partners are playing hide and seek!
      </p>

      <Link 
        to="/" 
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 duration-200"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
}
