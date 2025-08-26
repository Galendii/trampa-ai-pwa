"use client";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">T</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Trampa AI</h1>
          <p className="text-slate-600">Sua gestão, clara como o dia.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-2">
            Você está offline
          </h2>
          <p className="text-slate-600 mb-4">
            Verifique sua conexão com a internet e tente novamente.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="btn-primary w-full"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    </div>
  );
}
