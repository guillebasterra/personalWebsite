export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="flex h-screen items-start justify-left bg-gray-100 pt-10">
        {children}
      </div>
    );
  }