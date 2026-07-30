import Logo from "../components/common/Logo";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-6xl overflow-hidden rounded-[32px] border border-[#e9e2d0] bg-white shadow-[0_20px_60px_-24px_rgba(42,54,99,0.35)]">
        <div className="grid min-h-[680px] lg:grid-cols-1">
          <div className="flex items-center justify-center px-6 py-8 sm:px-8 lg:px-12">
            <div className="w-full max-w-xl">
              <div className="mb-8 flex justify-center lg:hidden">
                <div className="rounded-2xl border border-[#e9e2d0] bg-[#f7f4ea] p-3">
                  <Logo />
                </div>
              </div>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
