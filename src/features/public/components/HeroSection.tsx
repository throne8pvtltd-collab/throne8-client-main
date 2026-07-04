import Button from '@/shared/uiComponents/Button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-white relative overflow-hidden">
      {/* Optional: Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-[#4a3728]/20 to-[#8b7355]/20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-[#8b7355]/20 to-[#4a3728]/20 blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="bg-gradient-to-r from-[#4a3728] to-[#8b7355] bg-clip-text text-transparent">Throne8</span> Job Portal
        </h1>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Find your dream job or hire the best talent in a professional, premium environment
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/login">
            <Button variant="primary">Login</Button>
          </Link>
          <Link href="/register">
            <Button variant="secondary">Register</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}