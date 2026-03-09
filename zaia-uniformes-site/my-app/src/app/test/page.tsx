export default function TestPage() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-brand-dark mb-4">
          ✅ Next.js está funcionando!
        </h1>
        <p className="text-gray-600 mb-4">
          Se você consegue ver esta página em <code>/test</code>, 
          então o Next.js está configurado corretamente.
        </p>
        <div className="space-y-2">
          <p>
            <a href="/" className="text-brand-teal hover:underline">
              ← Voltar para Home
            </a>
          </p>
          <p>
            <a href="/admin/login" className="text-brand-teal hover:underline">
              🔑 Ir para Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}